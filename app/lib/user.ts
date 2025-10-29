import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import { auth, db } from './firebaseConfig';

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
