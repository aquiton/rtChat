import { motion } from "motion/react";
import { useState } from "react";
export default function ServerView() {
  const messages = [
    { from: "me", message: "hi" },
    { from: "other", message: "hey" },
  ];

  const [activty, setActivity] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSendMessage = (e: React.FormEvent) => {
    if (currentMessage != "") {
      e.preventDefault();
      setActivity((prev) => {
        return [...prev, { from: "me", message: currentMessage }];
      });
    }
    setCurrentMessage("");
  };

  return (
    <div className="flex bg-slate-600 w-full font-mono">
      <div className="flex flex-col w-full">
        <motion.div
          className="shadow-md p-2 text-center"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 5,
          }}
        >
          Test ServerName
        </motion.div>
        <div className="overflow-y-auto h-5/6 p-4">
          <div className="flex justify-between items-center text-center">
            <p className="flex-1 border-b opacity-10"></p>
            <p className="px-4 text-xs opacity-30">{today}</p>
            <p className="flex-1 border-b opacity-10"></p>
          </div>

          {activty.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex gap-4 text-lg w-auto break-all p-1`}
              >
                <img
                  src="https://placehold.co/600x400"
                  className="h-10 w-10 object-cover rounded-full"
                />
                <div className="">
                  <div className="font-semibold">{message["from"]}</div>
                  <p className="">{message["message"]}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-slate-500 p-2 m-4 shadow-lg rounded-lg">
          <form onSubmit={handleSendMessage}>
            <textarea
              className="w-full bg-transparent outline-none break-all resize-none"
              onChange={(e) => setCurrentMessage(e.currentTarget.value)}
              value={currentMessage}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center text-center bg-slate-700 w-[150px]">
        <p className="font-semibold font-mono text-sm">ONLINE</p>
        <p>showering</p>
        <motion.button
          className="bg-green-500 rounded-lg shadow-md p-2 text-sm font-semibold"
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
        >
          Invite User
        </motion.button>
      </div>
    </div>
  );
}
