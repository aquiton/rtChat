import { motion } from "motion/react";
import { SetStateAction } from "react";

export const OptionsModal = ({
  setModalView,
}: {
  setModalView: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-white">Create Your Server!</p>
      <p className="text-center text-white">
        Your server is where you and your friends hang out
      </p>
      <motion.button
        className="p-2 text-white rounded-lg font-semibold border border-gray-300"
        initial={{
          backgroundPosition: "0% 0%",
        }}
        whileHover={{
          backgroundPosition: "0% 100%",
        }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage:
            "linear-gradient(to top, #00ff00 50%, transparent 50%)",
          backgroundSize: "100% 200%",
        }}
        onClick={() => {
          setModalView("create");
        }}
      >
        Create a server
      </motion.button>

      <motion.button
        className="p-2 text-white rounded-lg font-semibold border border-gray-300"
        initial={{
          backgroundPosition: "0% 0%",
        }}
        whileHover={{
          backgroundPosition: "0% 100%",
        }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage:
            "linear-gradient(to top,rgb(200, 0, 255) 50%, transparent 50%)",
          backgroundSize: "100% 200%",
        }}
        onClick={() => {
          setModalView("add");
        }}
      >
        Add a server
      </motion.button>
    </div>
  );
};
