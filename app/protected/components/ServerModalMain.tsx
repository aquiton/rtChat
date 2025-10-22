import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'motion/react';
import { SetStateAction, useState } from 'react';
import { OptionsModal } from './ServerModals/Options';
import { CreateModal } from './ServerModals/Create';
import { AddModal } from './ServerModals/Add';

interface ServerModalProps {
  showAddServer: boolean;
  setShowAddServer: React.Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

export const ServerModal = ({
  showAddServer,
  setShowAddServer,
  refetch,
}: ServerModalProps) => {
  const [modalView, setModalView] = useState('');

  const handleClose = () => {
    setShowAddServer(false);
    setModalView('');
  };

  return (
    <Dialog
      open={showAddServer}
      onClose={handleClose}
      onClick={handleClose}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={modalView}
          onClick={(e) => e.stopPropagation()}
          className="p-4 bg-black/85 border rounded-lg text-gray-700 font-semibold flex flex-col gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{ scale: 0.9 }}
          transition={{
            duration: 0.1,
            type: 'spring',
            stiffness: 500,
            damping: 50,
          }}
        >
          {modalView === 'create' && (
            <CreateModal
              key="create"
              back={setModalView}
              close={handleClose}
              refetch={refetch}
            />
          )}
          {modalView === 'add' && <AddModal key="add" />}
          {modalView === '' && (
            <OptionsModal key="options" setModalView={setModalView} />
          )}
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
};
