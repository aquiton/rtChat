'use client'
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

export function useUser(){
    const [user, setUser] = useState<User | null | false>(false)

    useEffect(() =>{
        return onAuthStateChanged(auth, (user) => setUser(user))
    }, [])

    return user
}