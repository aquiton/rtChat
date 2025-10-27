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
      const userStatusRef = ref(realTimedb, `users/${user?.uid}/status`);
      if (user) {
        // Mark user as online
        set(userStatusRef, 'online')
          .then(() => {
            // Mark user as offline when they disconnect
            onDisconnect(userStatusRef)
              .set('offline')
              .then(() => {
                console.log('User will be marked offline upon disconnect');
              });
          })
          .catch((err) => console.error('Error setting online status:', err));
      } else {
        setUser(false);
        onDisconnect(userStatusRef).set('offline');
      }
    });
  }, []);

  return user;
}

//implement method to check if user is online or not per server
