import { Dialog } from "@headlessui/react";
import {
  ArrowRightIcon,
  Cog6ToothIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";

interface ServerSettingProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ServerSettingsOptions = ({
  open,
  setOpen,
}: ServerSettingProps) => {
  const [openServerSettings, setOpenServerSettings] = useState(false);

  const handleClose = () => {
    console.log(close);
    setOpen(false);
  };

  const handleServerSettings = () => {
    setOpenServerSettings(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      className="absolute w-auto inset-0 z-40 "
    >
      <Dialog
        open={openServerSettings}
        onClose={handleClose}
        className="absolute w-auto inset-0 z-50"
      >
        <div className="bg-red-500 w-full h-screen">
          <XMarkIcon
            className="size-4 stroke-2"
            onClick={() => setOpenServerSettings(false)}
          />
          <p>Hello</p>
        </div>
      </Dialog>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-32 left-32 flex flex-col p-2 gap-1 bg-gray-600 shadow-lg shadow-black rounded-lg text-white w-auto text-sm"
        initial={{ scaleY: 0.5 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.1,
          type: "spring",
          stiffness: 500,
          damping: 20,
        }}
        style={{ transformOrigin: "top" }}
      >
        <button className="hover:text-pink-500 transition duration-200 rounded-lg px-4 flex items-center justify-between w-full hover:scale-105 ">
          <p>Invite People</p>
          <UserPlusIcon className="size-5 rounded-full m-2" />
        </button>
        <button
          onClick={handleServerSettings}
          className="hover:text-orange-600 transition duration-200 rounded-lg px-4 flex items-center justify-between w-full hover:scale-105"
        >
          <p>Server Settings</p>
          <Cog6ToothIcon className="size-5 rounded-full m-2" />
        </button>
      </motion.div>
    </Dialog>
  );
};
