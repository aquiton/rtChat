import { useState } from 'react';
import { Server } from '../../home/page';

interface ServerProfileProps {
  serverData: Server;
}

export const ServerProfileView = ({ serverData }: ServerProfileProps) => {
  const [serverName, setServerName] = useState(serverData.name);

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
        className={`${serverName != serverData.name ? '' : 'hidden'} flex w-full justify-center p-4`}
      >
        <div className="flex justify-evenly w-1/4 p-2 rounded-xl border border-white/60">
          <button className="font-[600] text-red-500">Cancel</button>
          <button className="font-[600]">Save Changes</button>
        </div>
      </div>
    </div>
  );
};
