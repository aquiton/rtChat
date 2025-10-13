import { Dialog } from '@headlessui/react';
import { SetStateAction, useState } from 'react';
import { createServerInvite } from '@/app/lib/firestore';

interface InviteModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  serverId: string;
}

export const InviteModal = ({ open, setOpen, serverId }: InviteModalProps) => {
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
        className="bg-gray-500 rounded-2xl text-white p-6"
      >
        <p>Code: {inviteCode}</p>
        <button onClick={generateCode}>Generat Code</button>
      </div>
    </Dialog>
  );
};
