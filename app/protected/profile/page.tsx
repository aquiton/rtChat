'use client';

import { logout } from '@/app/lib/auth';
import { useLogoutStore } from '@/app/store/useLogoutStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { setIsLoggingOut } = useLogoutStore();
  const router = useRouter();
  const handleLogOut = async () => {
    setIsLoggingOut(true);
    router.replace('/');
    await logout().finally(() => {
      setTimeout(() => {
        setIsLoggingOut(false);
      }, 1000);
    });
  };

  return (
    <div className="flex text-white">
      <div className="bg-zinc-900 flex items-end flex-col w-1/3 h-screen">
        <div className="p-4 w-1/4">
          <p>My Account</p>
          <button className="text-red-500 font-semibold" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
      <div className="flex w-2/4 bg-zinc-800 h-screen p-4">Profile Info</div>
      <div className="flex w-1/4 p-4 bg-zinc-800">
        <XMarkIcon className="size-8 rounded-full border-2 border-white/50 text-white/50 hover:text-white hover:border-white " />
      </div>
    </div>
  );
}
