"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, realTimedb } from "./firebaseConfig";
import { onDisconnect, ref, set } from "firebase/database";

export function useUser() {
  const [user, setUser] = useState<User | null | false>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      const userStatusRef = ref(realTimedb, `users/${user?.uid}/status`);
      if (user) {
        console.log("hellow");
        // Mark user as online
        set(userStatusRef, "online")
          .then(() => {
            // Mark user as offline when they disconnect
            onDisconnect(userStatusRef)
              .set("offline")
              .then(() => {
                console.log("User will be marked offline upon disconnect");
              });
          })
          .catch((err) => console.error("Error setting online status:", err));
      } else {
        setUser(false);
        onDisconnect(userStatusRef).set("offline");
      }
    });
  }, []);

  return user;
}
