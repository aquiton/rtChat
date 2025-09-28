"use client";
import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ServerView from "../components/ServerView";
import { useEffect, useState } from "react";
import { getCurrentUser, getUserServers } from "@/app/lib/firestore";
import { useQuery } from "@tanstack/react-query";
import { ServerModal } from "../components/ServerModalMain";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

interface User {
  id: string;
  name: string;
}

interface Channel {
  messages: string[];
  name: string;
}
export interface Server {
  id: string;
  name: string;
  channels: Channel[];
  users: User[];
}

export default function Home() {
  const [showAddServer, setShowAddServer] = useState(false);
  const [server, setServer] = useState<Server>();
  const router = useRouter();

  const userRes = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(), // Calls getUsers from the Firestore file
  });

  const userServers = userRes.data?.servers ?? [];

  const serverRes = useQuery({
    queryKey: ["userServers", userServers],
    queryFn: () => getUserServers(userServers ?? []),
    enabled: userServers.length > 0,
  });

  const servers: Server[] = serverRes?.data ?? [];

  const handleServerSelect = (serverData: Server) => {
    setServer(serverData);
  };

  useEffect(() => {
    if (servers.length > 0) {
      setServer(servers[0]);
    }
  }, [servers]);

  const handleUserSettings = () => {
    router.push("./profile");
  };

  return (
    <motion.div
      className="flex w-full h-screen text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* server bar */}
      <div className="flex flex-col justify-between items-center pb-6">
        <div className="flex flex-col gap-2 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ">
          <div className="flex flex-col gap-2 p-1">
            {servers?.map((server, index) => (
              <img
                key={index}
                src="https://placehold.co/600x400"
                className="h-12 w-12 object-cover rounded-full duration-300 hover:cursor-pointer"
                onClick={() => {
                  handleServerSelect(server);
                }}
              />
            ))}
            <PlusCircleIcon
              className="h-12 w-12 stroke-1 text-slate-400 rounded-full hover:cursor-pointer hover:text-white transition-all duration-300 ease-in-out"
              stroke="currentColor"
              fill="none"
              strokeWidth={1}
              onClick={() => setShowAddServer(true)}
            />
          </div>
        </div>
        <div className="flex justify-center items-center p-1">
          <Cog6ToothIcon
            className="shrink-0 h-12 w-12 stroke-1 text-slate-400 rounded-full hover:cursor-pointer hover:text-white transition-color duration-300"
            onClick={handleUserSettings}
          />
        </div>
      </div>
      <ServerModal
        showAddServer={showAddServer}
        setShowAddServer={setShowAddServer}
        refetch={userRes.refetch}
      />
      {/* server component */}
      {servers.length > 0 && server ? (
        <ServerView serverData={server} />
      ) : (
        <div className="flex w-full justify-center items-center text-slate-500 font-semibold text-lg gap-4">
          <ArrowLeftIcon className="w-6 h-6 stroke-2" />
          <p>Add a server to start talking!</p>
        </div>
      )}
    </motion.div>
  );
}
