import { Dialog } from '@headlessui/react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Server } from '../../home/page';
import { useUser } from '@/app/lib/auth';
import { useEffect, useRef, useState } from 'react';

interface ServerSettingsViewProps {
  openServerSettings: boolean;
  setOpenServerSettings: (open: boolean) => void;
  serverData: Server;
  handleDelete: () => void;
}

export const ServerSettingsView = ({
  openServerSettings,
  setOpenServerSettings,
  serverData,
  handleDelete,
}: ServerSettingsViewProps) => {
  const currentUser = useUser();
  const currentuserRole = currentUser
    ? serverData.users.find((user) => user.id === currentUser.uid)?.role
    : '';
  const serverProfileRef = useRef<HTMLButtonElement>(null);
  const [serverName, setServerName] = useState(serverData.name);

  const handleClose = () => {
    setOpenServerSettings(false);
  };

  useEffect(() => {
    serverProfileRef.current?.focus();
  }, []);

  return (
    <Dialog
      open={openServerSettings}
      onClose={handleClose}
      className="absolute w-auto inset-0 z-50"
    >
      <div
        className="bg-black w-full h-screen flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col w-1/4 bg-black text-zinc-100 items-end p-4">
          <div className="flex flex-col gap-2 w-4/6">
            <section className="py-1">
              <p className="px-3 text-xs text-white/25">
                {serverData.name.toUpperCase()}
              </p>
              <button
                className="transition duration-300 hover:text-white text-white/50 hover:bg-white/25 rounded-md px-3 w-full text-start focus:bg-red-700 focus:text-white"
                ref={serverProfileRef}
              >
                <p>Server Profile</p>
              </button>
            </section>
            <div className="border-b border-white/25 ml-3" />

            <section className="flex flex-col gap-1 py-1">
              <p className="px-3 text-xs text-white/25">PEOPLE</p>
              <button className="transition duration-300 hover:text-white text-white/50 hover:bg-white/25 rounded-md px-3 w-full text-start focus:bg-red-700 focus:text-white">
                <p>Roles</p>
              </button>
            </section>
            <div className="border-b border-white/25 ml-3" />

            <section className="py-1">
              <p className="px-3 text-xs text-white/25">MODERATION</p>
              <button className="transition duration-300 hover:text-white text-white/50 hover:bg-white/25 rounded-md px-3 w-full text-start focus:bg-red-700 focus:text-white">
                <p>Bans</p>
              </button>
            </section>
            <div className="border-b border-white/25 ml-3" />

            {currentuserRole === 'owner' && (
              <section className="py-1">
                <div className="px-3 group hover:bg-red-500/10 rounded-md">
                  <button
                    onClick={handleDelete}
                    className="flex w-full items-center justify-between"
                  >
                    <p className="whitespace-nowrap font-[700] text-red-500">
                      Delete Server
                    </p>
                    <div className="group-hover:bg-white/50 rounded-full h-[1px] w-0 group-hover:w-full mx-2 transition-all duration-700" />
                    <TrashIcon className="shrink-0 size-5 stroke-2 text-red-500" />
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="p-6 text-white flex flex-col w-2/4 rounded-lg">
          <p className="font-bold text-2xl">Server Profile</p>
          <p className="text-sm">Customize how your server appears to others</p>
          <p className="text-white font-[600] text-sm py-1">Name</p>
          <input
            placeholder="Server name"
            className="bg-black border border-white/50 rounded-lg p-2 text-sm focus:outline-none focus:border-red-500"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
        </div>

        <div
          className={`${serverName.length < 1}border border-white/50 rounded-lg flex items-center gap-4`}
        >
          <button>Cancel</button>
          <button>Save Changes</button>
        </div>

        <div className="flex w-1/4 bg-black text-white p-6 justify-end">
          <XMarkIcon
            className="size-10 stroke-2 text-white/50 border-2 border-white/50 rounded-full p-2 hover:text-white hover:border-white hover:cursor-pointer"
            onClick={() => setOpenServerSettings(false)}
          />
        </div>
      </div>
    </Dialog>
  );
};
