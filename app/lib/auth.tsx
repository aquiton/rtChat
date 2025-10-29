'use client';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db, realTimedb } from './firebaseConfig';
import { onDisconnect, ref, set } from 'firebase/database';
import { doc, setDoc } from '@firebase/firestore';

// Methods that require Auth

export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: username,
    });
    const userData = {
      username: username,
      servers: [],
    };
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    const userStatusRef = ref(
      realTimedb,
      `users/${userCredential.user.uid}/status`
    );
    await set(userStatusRef, 'offline'); // Default to offline
  } catch (error: any) {
    console.error('Sign up error:', error.message);
  }
};

// Login Function
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const userStatusRef = ref(realTimedb, `users/${uid}/status`);
    await set(userStatusRef, 'online');

    onDisconnect(userStatusRef).set('offline');

    return userCredential.user;
  } catch (error: any) {
    return false;
  }
};

export const logout = async () => {
  if (auth.currentUser) {
    // Reference to the user's status in Realtime Database
    const userStatusRef = ref(
      realTimedb,
      `users/${auth.currentUser.uid}/status`
    );
    await set(userStatusRef, 'offline')
      .then(() => {
        console.log('User status set to offline.');
        signOut(auth); // Log out the user
      })
      .catch((error) => {
        console.error('Error setting offline status:', error);
      });
  } else {
    await signOut(auth);
    console.log('No user is logged in, just signed out.');
  }
};

export function useUser() {
  const [user, setUser] = useState<User | null | false>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return user;
}

//implement method to check if user is online or not per server
// per server approach
// meaning subscribe to a shard/node and listen for any status updates
