import { Dialog } from '@headlessui/react';
import { SetStateAction, useState } from 'react';
import { Server } from '../../home/page';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface InviteModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  serverId: string;
  serverData: Server;
  inviteCode: string;
  setInviteCode: React.Dispatch<SetStateAction<string>>;
}

export const InviteModal = ({
  open,
  setOpen,
  serverData,
  inviteCode,
  setInviteCode,
}: InviteModalProps) => {
  const [isCopied, setisCopied] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setInviteCode('');
  };

  const handleCopy = async (s: string) => {
    await navigator.clipboard.writeText(s);
    setisCopied(true);
    setTimeout(() => {
      setisCopied(false);
    }, 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      className="fixed z-50 inset-0 flex justify-center items-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border border-gray-100 bg-black/75 rounded-2xl text-white p-4 w-fit min-w-[350px] flex flex-col gap-3 justify-center "
      >
        <div className="flex items-center justify-between w-full">
          <p className="font-[700]">Invite friends to {serverData.name} </p>
          <XMarkIcon
            className="size-5 stroke-2 hover:text-red-600 hover:cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <p className="text-sm text-white/75 font-[300]">
          Send a server invite link to a friend
        </p>
        <div
          className={` border border-gray-100/25 flex justify-between items-center w-full bg-black/25 p-2 rounded-lg text-white ${isCopied ? 'border-green-500' : ''}`}
        >
          <p>{inviteCode ? inviteCode : 'Generating...'}</p>
          <button
            onClick={() => handleCopy(inviteCode)}
            className={`transition-colors duration-300 font-[700] text-sm bg-red-600 py-1 px-4 rounded-lg ${isCopied ? 'bg-green-700' : 'hover:bg-red-700'}`}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </Dialog>
  );
};
