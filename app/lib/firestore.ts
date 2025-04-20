import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Methods to access Firestore Database

export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("error getting auth current user");
    }
    const userdocRef = doc(db, "users", user.uid);
    const userdata = await getDoc(userdocRef);
    const data = userdata.data();
    return {
      uid: userdata.id,
      servers: data?.servers,
      username: data?.username,
    };
  } catch (error) {
    console.error("Error getting current user: ", error);
  }
};

export const getUser = async (userID: string) => {
  try {
    const userdocRef = doc(db, "users", userID);
    const querySnapshot = await getDoc(userdocRef);
    return querySnapshot.data();
  } catch (error) {
    console.error("Error getting user: ", error);
  }
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateUser = async (
  userId: string,
  updatedData: { [key: string]: any }
) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, updatedData);
  } catch (error) {
    console.error("Error updating user: ", error);
  }
};

export const createServer = async (serverName: string) => {
  try {
    const currentUser = await getCurrentUser();
    console.log(currentUser);
    if (!currentUser || !currentUser.uid) {
      throw new Error("Current user is not authenticated");
    }

    const serverData = {
      name: serverName,
      channels: [{ name: "general", messages: [""] }],
      roles: [],
      users: [{ id: currentUser.uid, name: currentUser.username }],
    };

    const serverRef = await addDoc(collection(db, "servers"), serverData);

    updateUser(currentUser.uid, {
      servers: currentUser.servers
        ? [...currentUser.servers, serverRef.id]
        : [serverRef.id],
    });

    return serverRef.id; // Return the server ID
  } catch (error) {
    console.error("Error creating server: ", error);
    throw error;
  }
};

export const getUserServers = async (serverIDs: string[]) => {
  try {
    const serverPromises = serverIDs.map(async (id) => {
      const ref = doc(db, "servers", id);
      const snapshot = await getDoc(ref);
      const data = snapshot.data();
      return {
        id: snapshot?.id,
        name: data?.name,
        channels: data?.channels,
        roles: data?.roles,
        users: data?.users,
      };
    });

    const results = await Promise.all(serverPromises);
    return results.reverse();
  } catch (error) {
    console.error("Error fetching servers:", error);
    return [];
  }
};
