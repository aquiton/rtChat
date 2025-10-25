import { addDoc, collection } from '@firebase/firestore';
import { db } from './firebaseConfig';

export const createChannel = async (serverId: string, channelName: string) => {
  const channelDocRef = collection(db, 'servers', serverId, 'channels');
  await addDoc(channelDocRef, {
    name: channelName,
  });
  return;
};
