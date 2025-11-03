import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { getCurrentUser, updateUser } from './user';

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

export const addServer = async (inviteCode: string) => {
  const user = auth.currentUser;
  if (!user) return;

  // Find the server linked to this invite code
  const inviteDocRef = doc(db, 'invite_codes', inviteCode);
  const inviteSnap = await getDoc(inviteDocRef);

  if (!inviteSnap.exists()) {
    console.error('Invalid invite code');
    return;
  }

  const inviteData = inviteSnap.data();
  const serverId = inviteData.serverId;

  if (!serverId) {
    console.error('Invite code missing serverId field');
    return;
  }

  const serverDocRef = doc(db, 'servers', serverId);
  await updateDoc(serverDocRef, {
    users: arrayUnion({
      id: user.uid,
      name: user.displayName,
      role: 'user',
    }),
  });

  // Add the server ID to the user's 'servers' array
  const userDocRef = doc(db, 'users', user.uid);
  await updateDoc(userDocRef, {
    servers: arrayUnion(serverId),
  });
};
