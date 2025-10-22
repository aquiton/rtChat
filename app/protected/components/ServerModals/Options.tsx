import { motion } from 'motion/react';
import { SetStateAction } from 'react';

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
        initial={{ borderColor: '#ffffffff' }}
        transition={{
          duration: 0.15,
        }}
        whileHover={{
          borderColor: '#ff0000',
        }}
        style={{
          borderWidth: 4,
          borderStyle: 'solid',
          borderRadius: 12,
          padding: 4,
        }}
        className="transition-colors transition-opacity duration-300 text-white/50 hover:text-white hover:opacity-100 border border-red-500 opacity-75"
        onClick={() => {
          setModalView('create');
        }}
      >
        Create a server
      </motion.button>

      <motion.button
        initial={{ borderColor: '#ffffffff' }}
        transition={{
          duration: 0.15,
        }}
        whileHover={{
          borderColor: '#ff0000',
        }}
        style={{
          borderWidth: 4,
          borderStyle: 'solid',
          borderRadius: 12,
          padding: 4,
        }}
        className="transition-colors transition-opacity duration-300 text-white/50 hover:text-white hover:opacity-100 border border-red-500 opacity-75"
        onClick={() => {
          setModalView('add');
        }}
      >
        Add a server
      </motion.button>
    </div>
  );
};
