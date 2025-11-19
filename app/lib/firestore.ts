import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from '@firebase/firestore';
import { db } from './firebaseConfig';
import { Message } from '../protected/components/ServerView';
import { v4 as uuidv4 } from 'uuid';

// Methods to access Firestore Database

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
  const uuid = uuidv4();
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
