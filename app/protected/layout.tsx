"use client";
import { ReactNode, useState } from "react";
import { useUser } from "../lib/auth";
import { useRouter } from "next/navigation";
import { logout } from "../lib/firebaseConfig";
import AuthGuard from "./components/AuthGuard";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
  const user = useUser();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(!isLoggingOut);
    await logout();
    router.push("/");
    setIsLoggingOut(!isLoggingOut);
  };

  if (!user && !isLoggingOut) return <AuthGuard />;
  return (
    <div className="">
      <nav className="flex justify-between gap-4 text-white">
        <button onClick={handleSignOut}>Logout</button>
      </nav>
      {children}
    </div>
  );
}
