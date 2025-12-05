import { Dialog } from '@headlessui/react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Server } from '../../home/page';
import { useUser } from '@/app/lib/auth';
import { useEffect, useRef, useState } from 'react';
import { ServerProfileView } from '../ServerSettingViews/ServerProfile';

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

  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

  const handleClose = () => {
    setOpenServerSettings(false);
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteConfirmModal(false);
  };

  const handleDeleteModalOpen = () => {
    setOpenDeleteConfirmModal(true);
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
                    onClick={handleDeleteModalOpen}
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

        <ServerProfileView serverData={serverData} handleClose={handleClose} />

        <Dialog
          open={openDeleteConfirmModal}
          onClose={handleDeleteModalClose}
          className="inset-0 z-50 fixed flex justify-center items-center bg-gray-900/50"
        >
          <div className="flex flex-col gap-4 text-white p-4 border border-red-500 rounded-2xl bg-black">
            <p className="font-[700]">
              ARE YOU SURE YOU WANT TO{' '}
              <span className="text-red-500">DELETE: </span>
            </p>
            <p className="w-full text-center">{serverData.name}</p>

            <div className="w-full flex justify-between">
              <button
                onClick={handleDeleteModalClose}
                className="transition-scale duration-300 hover:scale-105 hover:text-red-500 px-6 py-1 rounded-full border border-white/50"
              >
                NO
              </button>
              <button
                onClick={handleDelete}
                className="transition-scale duration-300 hover:scale-95 hover:text-red-500 px-6 py-1 rounded-full border border-white/50"
              >
                YES
              </button>
            </div>
          </div>
        </Dialog>

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
