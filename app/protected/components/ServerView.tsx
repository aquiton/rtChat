import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Server } from "../home/page";
import { ChevronDownIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { auth } from "@/app/lib/firebaseConfig";
import { ServerSettings } from "./ServerModals/ServerSettings";

interface Message {
  from: string;
  message: string;
  when: string;
}

export default function ServerView({ serverData }: { serverData: Server }) {
  const currentUser = auth.currentUser;
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [channel, setChannel] = useState(serverData.channels[0]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [activity, setActivity] = useState<Message[]>([]);
  const [openServerSettings, setOpenServerSettings] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage != "" && currentUser) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true, // ensures it's in 12-hour format
      });
      setActivity((prev) => {
        return [
          ...prev,
          {
            from: currentUser.displayName!,
            message: currentMessage,
            when: currentTime,
          },
        ];
      });
    }
    setCurrentMessage("");
  };

  const handleInviteUser = () => {
    // const audio = new Audio("/audio/buttonclick.mp3");
    // audio.play();
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [activity]);

  return (
    <div className="flex flex-col bg-slate-600 w-full font-mono">
      <div>
        <motion.div
          className=" p-2 text-center"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 5,
          }}
        >
          {serverData.name}
        </motion.div>
      </div>

      <div className="flex h-full mb-6">
        {/* Channels  */}
        <div className="flex flex-col max-w-64 border border-slate-600 rounded-tl-lg bg-slate-700">
          <div className="relative flex items-center border-slate-600 border-b p-4 text-sm  whitespace-nowrap w-64">
            <p className="truncate">{serverData.name}</p>
            <button className="m-1" onClick={() => setOpenServerSettings(true)}>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            <ServerSettings
              open={openServerSettings}
              setOpen={setOpenServerSettings}
            />
          </div>

          <div>
            <div className=" mx-2 my-2">Channels</div>
            {serverData.channels.map((channel, index) => (
              <p
                key={index}
                className="flex gap-1 p-2 m-2 text-sm rounded-lg hover:bg-slate-600 hover:text-cyan-300 transition-all duration-300"
              >
                <HashtagIcon className="w-4 h-4" />
                {channel.name}
              </p>
            ))}
            <div className="flex justify-center">
              <motion.button
                className="bg-orange-300 text-slate-600 shadow-md shadow-black rounded-lg p-2 m-4 text-sm whitespace-nowrap font-semibold select-none"
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                Create Channel
              </motion.button>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex flex-col w-full overflow-auto text-black border border-slate-600 bg-slate-800 text-white p-1">
          <div className="border-slate-600 border-b p-4"># {channel.name}</div>
          <div
            className="flex-1 overflow-auto p-4 max-h-[calc(100vh-200px)] custom-scrollbar"
            ref={chatBoxRef}
          >
            {activity.map((activity, index) => (
              <div key={index} className="py-2">
                <div>
                  <div className="flex gap-2 items-center">
                    <div className="font-semibold">{activity.from}</div>
                    <div className="text-xs text-slate-500">
                      {activity.when}
                    </div>
                  </div>
                  <div>{activity.message}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => handleSendMessage(e)} className="w-full p-4">
            <input
              className="w-full text-black bg-slate-500 p-2 rounded-lg focus:outline-none text-white"
              placeholder={`Message #${channel.name}`}
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.currentTarget.value);
              }}
            />
          </form>
        </div>

        {/* User */}
        <div className="flex flex-col w-40 p-4 items-center text-center bg-slate-700">
          <p className="font-semibold font-mono text-sm text-green-500 shadow-xl shadow-green-500/50 hover:shadow-none hover:text-slate-500 hover:border-slate-500 border-b border-green-500">
            ONLINE
          </p>
          <p className="truncate w-32 text-sm py-2 text-green-400">
            {serverData.users[0].name}
          </p>
          <motion.button
            className="bg-green-500 rounded-lg shadow-md shadow-black p-2 text-sm font-semibold text-slate-600 select-none"
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleInviteUser}
          >
            Invite User
          </motion.button>
        </div>
      </div>
    </div>
  );
}
