import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import { auth, db } from './firebaseConfig';
import { Message } from '../protected/components/ServerView';
// Methods to access Firestore Database

export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('error getting auth current user');
    }
    const userdocRef = doc(db, 'users', user.uid);
    const userdata = await getDoc(userdocRef);
    const data = userdata.data();
    return {
      uid: userdata.id,
      servers: data?.servers,
      username: data?.username,
    };
  } catch (error) {
    console.error('Error getting current user: ', error);
  }
};

export const getUser = async (userID: string) => {
  try {
    const userdocRef = doc(db, 'users', userID);
    const querySnapshot = await getDoc(userdocRef);
    return querySnapshot.data();
  } catch (error) {
    console.error('Error getting user: ', error);
  }
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateUser = async (
  userId: string,
  updatedData: { [key: string]: any } //fix this any
) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, updatedData);
  } catch (error) {
    console.error('Error updating user: ', error);
  }
};

export const createServer = async (serverName: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.uid) {
      throw new Error('Current user is not authenticated');
    }

    //Create server data

    const serverData = {
      active: true,
      name: serverName,
      channels: [],
      users: [
        { id: currentUser.uid, name: currentUser.username, role: 'owner' },
      ],
    };

    //Create server doc in server collection

    const serverRef = await addDoc(collection(db, 'servers'), serverData);

    //Create channel data

    const channelData = {
      name: 'general',
    };

    //Create channel doc in server

    const channelRef = await addDoc(
      collection(db, 'servers', serverRef.id, 'channels'),
      channelData
    );

    //Create message collection

    const messageCollectionRef = collection(
      db,
      'servers',
      serverRef.id,
      'channels',
      channelRef.id,
      'messages'
    );

    //Create inital message for channel

    const baseMessageData = {
      message: 'Welcome to the channel!',
      username: 'RTCHAT',
      createdTime: new Date().toISOString(),
    };

    //Add doc to message

    await addDoc(messageCollectionRef, baseMessageData);

    updateUser(currentUser.uid, {
      servers: currentUser.servers
        ? [...currentUser.servers, serverRef.id]
        : [serverRef.id],
    });

    return serverRef.id; // Return the server ID
  } catch (error) {
    console.error('Error creating server: ', error);
    throw error;
  }
};

//TODO: Create add user

export const deleteServer = async (serverID: string) => {
  try {
    const serverdocRef = doc(db, 'servers', serverID);
    await updateDoc(serverdocRef, {
      active: false,
    });
  } catch (error) {
    console.error('Error delete server: ', error);
  }
};

/* 
  Function: getUserServers
  Params: serverIDS => list of ids from the current user
  Return a list of servers ids and general information to pre-populate the view
*/

export const getUserServers = async (serverIDs: string[]) => {
  try {
    const serverPromises = serverIDs.map(async (id) => {
      const serverRef = doc(db, 'servers', id);
      const channelQuery = query(collection(db, 'servers', id, 'channels'));
      const channelSnapShot = await getDocs(channelQuery);
      const snapshot = await getDoc(serverRef);
      const data = snapshot.data();
      return {
        active: data?.active ?? false,
        id: snapshot?.id ?? '',
        channels:
          channelSnapShot?.docs.map((doc) => ({
            name: doc.data().name,
            serverId: doc.data().serverId,
            id: doc.id,
          })) ?? [],
        name: data?.name ?? '',
        users: data?.users ?? [],
      };
    });

    const results = await Promise.all(serverPromises);
    return results.filter((server) => server.active == true).reverse();
  } catch (error) {
    console.error('Error fetching servers:', error);
    return [];
  }
};

export const getChannelMessages = (
  serverId: string,
  channelId: string,
  setActivity: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const messageQuery = query(
    collection(db, 'servers', serverId, 'channels', channelId, 'messages'),
    orderBy('createdTime')
  );

  const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      username: doc.data().username,
      message: doc.data().message,
      createdTime: doc.data().createdTime,
    }));
    setActivity(messages);
  });

  return unsubscribe;
};

export const sendChannelMessage = async (
  message: string,
  username: string | null,
  serverId: string,
  channelId: string
) => {
  try {
    const messageData = {
      message,
      username,
      createdTime: new Date().toISOString(),
    };

    await addDoc(
      collection(db, 'servers', serverId, 'channels', channelId, 'messages'),
      messageData
    );
  } catch (error) {
    console.error('Error sending message', error);
  }
};

export const createServerInvite = async (serverId: string) => {
  const uuid = crypto.randomUUID();
  const cleaned_uuid = uuid.split('-')[0];
  const createdTime = new Date().toISOString();

  const invite_data = {
    serverId: serverId,
    createdTime: createdTime,
    days_till_expired: 1,
  };

  const server_invite_data = {
    invite_id: cleaned_uuid,
    createdTime: createdTime,
    days_till_expired: 1,
  };

  const inviteRef = doc(db, 'invite_codes', cleaned_uuid);

  await setDoc(inviteRef, invite_data);

  const serverRef = collection(db, 'servers', serverId, 'invite_codes');

  await addDoc(serverRef, server_invite_data);

  return cleaned_uuid;
};
