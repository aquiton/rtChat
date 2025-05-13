import { Dialog } from "@headlessui/react";
import { Cog6ToothIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { SetStateAction } from "react";

interface ServerSettingProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ServerSettingsOptions = ({
  open,
  setOpen,
}: ServerSettingProps) => {
  const handleClose = () => {
    console.log(close);
    setOpen(false);
  };

  if (open) {
    console.log("setting is open");
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      className="absolute w-auto inset-0 z-50 "
    >
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
        <button className="hover:text-orange-600 transition duration-200 rounded-lg px-4 flex items-center justify-between w-full hover:scale-105">
          <p>Server Settings</p>
          <Cog6ToothIcon className="size-5 rounded-full m-2" />
        </button>
      </motion.div>
    </Dialog>
  );
};
