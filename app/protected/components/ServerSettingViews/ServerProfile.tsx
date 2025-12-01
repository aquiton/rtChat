import { useEffect, useState } from 'react';
import { Server } from '../../home/page';
import { useQueryClient } from '@tanstack/react-query';
import { updateServerName } from '@/app/lib/server';

interface ServerProfileProps {
  serverData: Server;
  handleClose: () => void;
}

export const ServerProfileView = ({
  serverData,
  handleClose,
}: ServerProfileProps) => {
  const queryClient = useQueryClient();

  const [serverName, setServerName] = useState(serverData.name);

  const handleCancel = () => {
    setServerName(serverData.name);
  };

  const handleSaveChanges = () => {
    try {
      updateServerName(serverName, serverData.id).then(() => {
        queryClient.invalidateQueries({ queryKey: ['userServers'] });
        handleClose();
      });
    } catch (error) {
      console.error('Error updating server name: ', error);
    }
  };

  useEffect(() => {
    if (serverData && serverData.name != serverName) {
      setServerName(serverData.name);
    }
  }, [serverData]);

  return (
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
      <div
        className={`${serverName != serverData.name ? 'opacity-100' : 'opacity-0 translate-y-2'} flex w-full justify-center p-4 transition duration-300`}
      >
        <div className="flex justify-evenly w-1/4 p-2 rounded-xl border border-white/60">
          <button className="font-[600] text-red-500" onClick={handleCancel}>
            Cancel
          </button>
          <button className="font-[600]" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
