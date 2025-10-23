import { XMarkIcon } from '@heroicons/react/24/outline';

export const AddModal = () => {
  return (
    <div className="flex flex-col text-white min-w-[325px]">
      <div className="flex justify-end">
        <button>
          <XMarkIcon className="w-5 h-5 stroke-2" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-2xl py-1">Join a Server</p>
        <p className="text-sm">
          Enter a invite below to join an existing server
        </p>
      </div>

      <div className="flex flex-col gap-2 py-4">
        <p>Invite Code</p>
        <input
          placeholder="Enter invite code... (e.g. 95a6dacb)"
          className="p-2 rounded-lg bg-black border focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between text-sm pt-2">
        <button>Back</button>
        <button className="bg-red-600 px-3 py-2 rounded-2xl hover:bg-red-700 transition-colors duration-300">
          Join Server
        </button>
      </div>
    </div>
  );
};
