"use client";
import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import ServerView from "../components/ServerView";
import { useEffect, useState } from "react";
import { getCurrentUser, getUserServers } from "@/app/lib/firestore";
import { useQuery } from "@tanstack/react-query";
import { ServerModal } from "../components/ServerModal";

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

  const userRes = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser, // Calls getUsers from the Firestore file
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

  return (
    <div className="flex w-full h-screen text-white">
      {/* server bar */}
      <div className="flex flex-col gap-2 bg-slate-600 p-4">
        {servers?.map((server, index) => (
          <img
            key={index}
            src="https://placehold.co/600x400"
            className="h-12 w-12 object-cover rounded-full hover:scale-110 hover:my-2 duration-300 hover:cursor-pointer"
            onClick={() => {
              handleServerSelect(server);
            }}
          />
        ))}
        <PlusCircleIcon
          className="h-12 w-12 stroke-1 bg-slate-600 text-slate-400 rounded-full hover:cursor-pointer hover:bg-teal-300 hover:text-black transition-all duration-300 ease-in-out hover:rounded-lg"
          stroke="currentColor"
          fill="none"
          strokeWidth={1}
          onClick={() => setShowAddServer(true)}
        />
      </div>
      <ServerModal
        showAddServer={showAddServer}
        setShowAddServer={setShowAddServer}
        refetch={userRes.refetch}
      />
      {/* server component */}
      {server ? (
        <ServerView serverData={server} />
      ) : (
        <div className="flex bg-slate-600 w-full justify-center items-center text-slate-500 font-semibold text-lg flex gap-4 items-center justify-center">
          <ArrowLeftIcon className="w-6 h-6 stroke-2" />
          <p>Add a server to start talking!</p>
        </div>
      )}
    </div>
  );
}
