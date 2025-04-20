import { Dialog } from "@headlessui/react";
import { Cog6ToothIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { SetStateAction } from "react";

interface ServerSettingProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ServerSettings = ({ open, setOpen }: ServerSettingProps) => {
  const handleClose = () => {
    console.log(close);
    setOpen(false);
  };

  if (open) {
    console.log("setting is open");
  }

  return open ? (
    <div
      onClick={handleClose}
      className="bg-blue-200 w-full absolute top-0 left-0 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-start justify-center p-2 gap-1 bg-gray-600 border border-gray-500 rounded-lg text-white shadow-md w-auto text-sm"
      >
        <button className="hover:text-pink-500 transition duration-200 rounded-lg px-4 flex items-center justify-between w-full ">
          <p>Invite People</p>
          <UserPlusIcon className="size-5 rounded-full m-2" />
        </button>
        <button className="hover:text-orange-600 transition duration-200 rounded-lg px-4 flex items-center justify-between w-full ">
          <p>Server Settings</p>
          <Cog6ToothIcon className="size-5 rounded-full m-2" />
        </button>
      </div>
    </div>
  ) : (
    "nothing"
  );
};
