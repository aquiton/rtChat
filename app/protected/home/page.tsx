"use client";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import ServerView from "../components/ServerView";
export default function Home() {
  return (
    <div className="flex w-full bg-yellow-500 h-screen text-white">
      {/* server bar */}
      <div className="flex flex-col gap-2 bg-slate-800 p-4">
        <img
          src="https://placehold.co/600x400"
          className="h-12 w-12 object-cover rounded-full"
        />
        <PlusCircleIcon className="h-12 w-12 stroke-1 bg-slate-600 text-slate-400 object-cover rounded-full hover:cursor-pointer" />
      </div>

      {/* server component */}
      <ServerView />
    </div>
  );
}
