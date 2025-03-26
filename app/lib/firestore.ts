import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { db } from "./firebaseConfig";
import { useState } from "react";

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateUser = async (
  userId: string,
  updatedData: { bio: string }
) => {
  try {
    // Get the reference to the document you want to update
    const userDocRef = doc(db, "users", userId); // 'users' is the collection name, and userId is the document ID

    // Update the document with the new data
    await updateDoc(userDocRef, updatedData);

    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error; // Throw error if something goes wrong
  }
};

export const createServer = async (serverName: string) => {
  try {
    // Create a server object with the required properties
    const serverData = {
      name: serverName,
      channels: [{name: "general", messages: []}],
      roles: [],
      users: [],
    };

    // Add the server to Firestore
    const serverRef = await addDoc(collection(db, "servers"), serverData);

    return serverRef.id; // Return the server ID
  } catch (error) {
    console.error("Error creating server: ", error);
    throw error;
  }
};
