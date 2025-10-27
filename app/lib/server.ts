import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

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
