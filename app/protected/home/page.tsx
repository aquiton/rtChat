"use client";
import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import ServerView from "../components/ServerView";
import { useEffect, useState } from "react";
import { getUsers, updateUser } from "@/app/lib/firestore";
import { useQuery } from "@tanstack/react-query";
import { ServerModal } from "../components/ServerModal";
export default function Home() {
  const [showAddServer, setShowAddServer] = useState(false);

  const userRes = useQuery({
    queryKey: ["users"],
    queryFn: getUsers, // Calls getUsers from the Firestore file
  });

  // const updateUserRes = async () => {
  //   await updateUser("4V1cJLvxEILvgJAiWksV", { bio: "bye" });
  // };

  // console.log(userRes.data);

  // useEffect(() => {
  //   updateUserRes();
  // });

  return (
    <div className="flex w-full bg-yellow-500 h-screen text-white">
      {/* server bar */}
      <div className="flex flex-col gap-2 bg-slate-800 p-4">
        <img
          src="https://placehold.co/600x400"
          className="h-12 w-12 object-cover rounded-full hover:scale-110 hover:my-2 duration-300"
        />
        <img
          src="https://placehold.co/600x400"
          className="h-12 w-12 object-cover rounded-full hover:scale-110 hover:my-2 duration-300"
        />{" "}
        <img
          src="https://placehold.co/600x400"
          className="h-12 w-12 object-cover rounded-full hover:scale-110 hover:my-2 duration-300"
        />{" "}
        <img
          src="https://placehold.co/600x400"
          className="h-12 w-12 object-cover rounded-full hover:scale-110 hover:my-2 duration-300"
        />{" "}
        <img
          src="https://placehold.co/600x400"
          className="h-12 w-12 object-cover rounded-full hover:scale-110 hover:my-2 duration-300"
        />{" "}
        <img
          src="https://placehold.co/600x400"
          className="h-12 w-12 object-cover rounded-full hover:scale-110 hover:my-2 duration-300"
        />
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
      />
      {/* server component */}
      <div className="flex bg-slate-600 w-full justify-center items-center text-slate-500 font-semibold text-lg flex gap-4 items-center justify-center">
        <ArrowLeftIcon className="w-6 h-6 stroke-2" />
        <p>Add a server to start talking!</p>
      </div>
      {/* <ServerView /> */}
    </div>
  );
}
