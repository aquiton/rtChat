import { Dialog } from '@headlessui/react';
import {
  Cog6ToothIcon,
  TrashIcon,
  UserPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { SetStateAction, useState } from 'react';
import { Server } from '../../home/page';
import { useQueryClient } from '@tanstack/react-query';
import { deleteServer } from '@/app/lib/server';

interface ServerSettingProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  serverData: Server;
}

export const ServerSettingsOptions = ({
  open,
  setOpen,
  serverData,
}: ServerSettingProps) => {
  const queryClient = useQueryClient();
  const [openServerSettings, setOpenServerSettings] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenServerSettings(false);
  };

  const handleServerSettings = () => {
    setOpenServerSettings(true);
  };

  const handleDelete = async () => {
    try {
      await deleteServer(serverData.id);
      await queryClient.invalidateQueries({
        queryKey: ['userServers'],
      });
    } catch (error) {
      console.error('Error deleting server: ', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      className="absolute w-auto inset-0 z-40 "
    >
      {/* 
        Server Settings modal   
      */}
      <Dialog
        open={openServerSettings}
        onClose={handleClose}
        className="absolute w-auto inset-0 z-50"
      >
        <div
          className="bg-red-500 w-full h-screen flex"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col w-1/4 bg-zinc-900 text-zinc-100 items-end p-4">
            <XMarkIcon
              className="size-5 stroke-2 text-zinc-100"
              onClick={() => setOpenServerSettings(false)}
            />
            <ul className="flex flex-col gap-1 w-4/6">
              <li className="hover:bg-white/25 rounded-md p-1">
                <button>
                  <p>Server Profile</p>
                </button>
              </li>
              <li className="hover:bg-red-500/10 rounded-md p-1">
                <button
                  onClick={handleDelete}
                  className="flex w-full items-center justify-between"
                >
                  <p className="font-[700] text-red-500">Delete Server</p>
                  <TrashIcon className="size-5 stroke-2 text-red-500" />
                </button>
              </li>
            </ul>
          </div>

          <div className="flex w-2/4 bg-zinc-800">
            <div>View</div>
          </div>

          <div className="flex w-1/4 bg-black"></div>
        </div>
      </Dialog>

      {/* server action options  */}

      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-24 left-24 flex flex-col p-2 gap-1 bg-black border rounded-lg text-white w-auto text-sm"
        initial={{ scaleY: 0.5 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.1,
          type: 'spring',
          stiffness: 500,
          damping: 20,
        }}
        style={{ transformOrigin: 'top' }}
      >
        <button className="group transition duration-200 rounded-lg px-4 flex items-center justify-between w-full hover:scale-105 ">
          <p>Invite People</p>
          <UserPlusIcon className="group-hover:text-red-600 size-5 rounded-full m-2" />
        </button>
        <button
          onClick={handleServerSettings}
          className="group transition duration-200 rounded-lg px-4 flex items-center justify-between w-full hover:scale-105"
        >
          <p>Server Settings</p>
          <Cog6ToothIcon className="group-hover:text-red-600 group-hover:animate-spin size-5 rounded-full m-2" />
        </button>
      </motion.div>
    </Dialog>
  );
};
