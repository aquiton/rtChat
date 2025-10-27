import { createChannel } from '@/app/lib/channel';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SetStateAction, useState } from 'react';

interface CreateChannelProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  serverId: string;
  refetch: () => void;
}

export const CreateChannelModal = ({
  open,
  setOpen,
  serverId,
  refetch,
}: CreateChannelProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [channelName, setChannelName] = useState('');

  const handleCreateChannel = async () => {
    await createChannel(serverId, channelName);
    refetch();
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
        className="border border-white bg-black/75 rounded-2xl text-white p-6 w-fit flex flex-col gap-4 min-w-[350px]"
      >
        <div className="flex items-center justify-between">
          <p className="text-2xl">Create Channel</p>
          <XMarkIcon className="stroke-2 shrink-0 w-5 h-5" />
        </div>

        <div className="flex flex-col gap-1">
          <p>Channel Name</p>
          <div className="flex items-center border rounded-lg px-1 focus-within:border-red-600 gap-1">
            <p className="font-[500]">#</p>
            <input
              className="bg-black rounded-lg p-1 outline-none"
              placeholder="new-channel"
              onChange={(e) => setChannelName(e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="">Cancel</button>
          <button
            onClick={handleCreateChannel}
            className="bg-red-600 rounded-lg px-4 py-1"
          >
            Create Channel
          </button>
        </div>
      </div>
    </Dialog>
  );
};
