import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Server } from '../home/page';
import { ChevronDownIcon, HashtagIcon } from '@heroicons/react/24/outline';
import { auth } from '@/app/lib/firebaseConfig';
import { ServerSettingsOptions } from './ServerModals/ServerSettingsOptions';
import {
  getChannelMessages,
  sendChannelMessage,
  createServerInvite,
} from '@/app/lib/firestore';
import { Dialog } from '@headlessui/react';

export interface Message {
  username: string;
  message: string;
  createdTime: string;
}

interface ServerViewProps {
  serverData: Server;
}

const SendMessage = (
  message: string,
  username: string | null,
  serverId: string,
  channelId: string
) => {
  sendChannelMessage(message, username, serverId, channelId);
};

export default function ServerView({ serverData }: ServerViewProps) {
  const currentUser = auth.currentUser;
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [channel, setChannel] = useState(serverData.channels[0]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [activity, setActivity] = useState<Message[]>([]);
  const [openServerSettings, setOpenServerSettings] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(true);

  useEffect(() => {
    if (!serverData?.id || !channel?.id) return;
    setActivity([]);

    setChannel(serverData.channels[0]);
    const unsubscribe = getChannelMessages(
      serverData.id,
      channel.id,
      setActivity
    );
    return unsubscribe;
  }, [serverData.id, channel.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage != '' && currentUser) {
      SendMessage(
        currentMessage,
        currentUser.displayName,
        serverData.id,
        serverData.channels[0].id
      );
      setCurrentMessage('');
    }
  };

  const handleInviteUser = async () => {
    const code = await createServerInvite(serverData.id);
    console.log(code);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [activity]);

  return (
    <div className="flex flex-col w-full font-mono">
      <div>
        <motion.div
          className=" p-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
          }}
        >
          {serverData.name}
        </motion.div>
      </div>

      <div className="flex h-full mb-6">
        {/* Channels  */}
        <div className="flex flex-col max-w-64 border border-white rounded-tl-lg ">
          <div className="relative flex items-center border-b border-white border-b p-4 text-sm  whitespace-nowrap w-60">
            <p className="truncate">{serverData.name}</p>
            <button className="m-1" onClick={() => setOpenServerSettings(true)}>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            <ServerSettingsOptions
              serverData={serverData}
              open={openServerSettings}
              setOpen={setOpenServerSettings}
            />
          </div>

          <div>
            <div className=" mx-2 my-2">Channels</div>
            {serverData.channels.map((channel, index) => (
              <p
                key={index}
                className="flex gap-1 p-2 m-2 text-sm rounded-lg hover:text-cyan-300 transition-all duration-300 select-none"
              >
                <HashtagIcon className="w-4 h-4" />
                {channel.name}
              </p>
            ))}
            <div className="flex justify-center">
              <motion.button
                className="text-slate-600 shadow-md shadow-black rounded-lg p-2 m-4 text-sm whitespace-nowrap font-semibold select-none hover:text-orange-500"
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                Create Channel
              </motion.button>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex flex-col w-full overflow-auto text-black text-white">
          {/* <div className="p-4"># {channel.name}</div> */}
          <div
            className="flex-1 overflow-auto p-4 max-h-[calc(100vh-200px)] custom-scrollbar"
            ref={chatBoxRef}
          >
            {activity.map((activity, index) => (
              <div key={index} className="py-2">
                <div>
                  <div className="flex gap-2 items-center">
                    <div className="font-semibold">{activity.username}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(activity.createdTime)
                        .toLocaleString('en-US', {
                          month: 'numeric',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })
                        .replace(',', '')}
                    </div>
                  </div>
                  <div>{activity.message}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => handleSendMessage(e)} className="w-full p-4">
            <input
              className="w-full text-black bg-black p-2 rounded-lg border border-white/50 focus:outline-none text-white"
              placeholder={`Message #${channel.name}`}
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.currentTarget.value);
              }}
            />
          </form>
        </div>

        {/* User */}
        <div className="flex flex-col w-40 p-4 items-center text-center border border-green-500/50 rounded-lg">
          <p className="font-semibold font-mono text-sm text-green-500 shadow-xl shadow-green-500/50 hover:shadow-none hover:text-slate-500 hover:border-slate-500 border-b border-green-500">
            ONLINE
          </p>
          <p className="truncate w-32 text-sm py-2 text-white">
            {serverData.users[0].name}
          </p>
          <motion.button
            className=" p-2 text-sm font-semibold text-white/50 select-none hover:text-green-500"
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleInviteUser}
          >
            Invite User
          </motion.button>
        </div>

        <Dialog
          open={openInviteModal}
          onClose={() => setOpenInviteModal(false)}
          className="fixed z-50 inset-0 flex justify-center items-center bg-black/50"
        >
          <div className="bg-gray-500 rounded-2xl text-white p-6">hi</div>
        </Dialog>
      </div>
    </div>
  );
}
