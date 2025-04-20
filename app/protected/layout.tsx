"use client";
import { ReactNode, useState } from "react";
import { logout, useUser } from "../lib/auth";
import { useRouter } from "next/navigation";
import AuthGuard from "./components/AuthGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  const [queryClient] = useState(() => new QueryClient());

  if (!user && !isLoggingOut) return <AuthGuard />;

  return (
    <div className="">
      <nav className="flex justify-between gap-4 text-white">
        <button onClick={handleSignOut}>Logout</button>
      </nav>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
