import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import SplitText from "./SplitText";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { login, signUp } from "../lib/auth";

interface LoginProps {
  setGlitchColors: Dispatch<SetStateAction<string[]>>;
}

export default function Login({ setGlitchColors }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUserName] = useState("");
  const accept: string[] = ["#6cff32", "#34b800", "#49ff00"];
  const deny: string[] = ["#ff0000", "#ba0000", "#ff3737"];
  const signup: string[] = ["#F72585", "#3A0CA3", "#4CC9F0"];
  const original: string[] = [
    "#fbbe5b",
    "#1e9ae0",
    "#e1b2f0",
    "#f46049",
    "#06D6A0",
    "#073B4C",
    "#118AB2",
    "#FFD166",
    "#EF476F",
  ];

  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const user = await login(email, password);
    if (user) {
      setGlitchColors(accept);
      setTimeout(() => {
        router.push("protected/home");
      }, 2000);
    } else {
      setGlitchColors(deny);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    await signUp(email, password, username);
    setIsSignUp(false);
    setEmail("");
    setPassword("");
    setUserName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignUp(email, password);
    } else {
      handleLogin(email, password);
    }
  };

  useEffect(() => {
    if (isSignUp) {
      setGlitchColors(signup);
    } else {
      setGlitchColors(original);
    }
  }, [isSignUp]);

  return (
    <div className="fixed z-50 bg-black bg-opacity-50 border border-white rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col p-20 gap-5">
        <SplitText text={"Welcome"} />
        <AnimatePresence>
          {isSignUp ? (
            <motion.input
              value={username}
              onChange={(e) => setUserName(e.currentTarget.value)}
              type="text"
              placeholder="name"
              className="p-2 bg-black border-2 border-gray-600 rounded focus:outline-none focus:border-fuchsia-500"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
              transition={{
                duration: 0.1,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            />
          ) : (
            ""
          )}
        </AnimatePresence>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="p-2 bg-black border-2 border-gray-600 rounded focus:outline-none focus:border-fuchsia-500"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="p-2 bg-black border-2 border-gray-600 rounded focus:outline-none focus:border-fuchsia-500"
        />
        <motion.button
          type="submit"
          className="p-2 bg-fuchsia-600 rounded text-white"
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </motion.button>
      </form>
      {isSignUp ? (
        <button onClick={() => setIsSignUp(false)} className="p-4 w-full">
          Login
        </button>
      ) : (
        <button onClick={() => setIsSignUp(true)} className="p-4 w-full">
          Sign up
        </button>
      )}
    </div>
  );
}
