import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const realTimedb = getDatabase(app);

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Signed up:", userCredential.user);
  } catch (error: any) {
    console.error("Sign up error:", error.message);
    throw error;
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
    console.log("Logged in:", userCredential.user);
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
    await set(userStatusRef, "offline")
      .then(() => {
        console.log("User status set to offline.");
        signOut(auth); // Log out the user
      })
      .catch((error) => {
        console.error("Error setting offline status:", error);
      });
  } else {
    await signOut(auth);
    console.log("No user is logged in, just signed out.");
  }
};
