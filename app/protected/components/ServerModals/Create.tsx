import { createServer } from "@/app/lib/firestore";
import { CameraIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { SetStateAction, useState } from "react";

interface ServerData {
  name: string;
  channels: number[];
  users: number[];
  roles: number[];
}

const initialServerDraft: ServerData = {
  name: "",
  channels: [],
  users: [],
  roles: [],
};

export const CreateModal = ({
  back,
  close,
}: {
  back: React.Dispatch<SetStateAction<string>>;
  close: () => void;
}) => {
  const [serverDraft, setServerDraft] = useState(initialServerDraft);
  const [serverName, setServerName] = useState('')
  const handleCreateServer = async () => {
    const serverid = await createServer(serverName);
    console.log(serverid);
    close();
  };

  const updateState = (key: string, value: string) => {
    setServerDraft((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div className="flex flex-col gap-4">
      <div className="text-teal-300 text-center">Customize Your Server</div>
      <p className="text-center">
        Give your new server a peronality with a name and an icon. <br />
        You can always change it later.
      </p>

      <div className="flex justify-center">
        <input id="fileInput" type="file" accept="image/*" className="hidden" />
        <label
          htmlFor="fileInput"
          className="flex flex-col p-2 w-1/5 items-center justify-center hover:cursor-pointer border-2 border-dashed border-slate-600 rounded-full hover:border-gray-400 hover:text-gray-400 transition-all duration-300"
        >
          <CameraIcon className="w-6 h-6" />
          <p className="text-sm">UPLOAD</p>
        </label>
      </div>

      <p className="text-gray-400">SERVER NAME</p>
      <input
        className="p-2 rounded-lg bg-slate-950 text-red-500"
        placeholder="Server Name..."
        onChange={(e) => updateState("name", e.currentTarget.value)}
      />
      <div className="flex justify-between">
        <button
          className="px-2"
          onClick={() => {
            back("");
          }}
        >
          back
        </button>
        <button className="text-green-500 px-2" onClick={handleCreateServer}>
          Create
        </button>
      </div>
    </motion.div>
  );
};
