import { Dialog } from '@headlessui/react';
import { SetStateAction, useState } from 'react';
import { createServerInvite } from '@/app/lib/firestore';
import { Server } from '../../home/page';

interface InviteModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  serverId: string;
  serverData: Server;
}

export const InviteModal = ({
  open,
  setOpen,
  serverId,
  serverData,
}: InviteModalProps) => {
  const [inviteCode, setInviteCode] = useState('');

  const handleClose = () => {
    setOpen(false);
    setInviteCode('');
  };

  const generateCode = async () => {
    const code = await createServerInvite(serverId);
    setInviteCode(code);
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
        className="bg-gray-500 rounded-2xl text-white p-6 w-1/3 flex flex-col gap-2 items-center"
      >
        <p>Invite friends to {serverData.name} </p>
        <p className="bg-gray-700 w-1/2 p-2 rounded-full text-gray-300/50">
          d{inviteCode}
        </p>
        <button
          onClick={generateCode}
          className="rounded-2xl border-red-600 border-2 px-3 py-1 hover:bg-red-600 hover:text-white font-[700] text-red-600 transition-colors duration-300"
        >
          Generate Code
        </button>
      </div>
    </Dialog>
  );
};
