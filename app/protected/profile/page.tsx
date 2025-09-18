"use client";

import { logout } from "@/app/lib/auth";
import { useLogoutStore } from "@/app/store/useLogoutStore";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { setIsLoggingOut } = useLogoutStore();
  const router = useRouter();
  const handleLogOut = async () => {
    setIsLoggingOut(true);
    router.replace("/");
    await logout().finally(() => {
      setTimeout(() => {
        setIsLoggingOut(false);
      }, 1000);
    });
  };

  return (
    <div className="flex text-white">
      <div className="bg-zinc-900 flex items-end flex-col w-1/3">
        <div className="p-4 w-1/3">
          <p>My Account</p>
          <button className="text-red-500 font-semibold" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
      <div className="flex w-2/3 bg-zinc-800">stuff</div>
    </div>
  );
}
