import { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import SplitText from './SplitText';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { login, signUp } from '../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUserName] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const user = await login(email, password);
    if (user) {
      setTimeout(() => {
        router.push('protected/home');
      }, 2000);
    } else {
      //invalid login
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    await signUp(email, password, username);
    setIsSignUp(false);
    setEmail('');
    setPassword('');
    setUserName('');
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
    } else {
    }
  }, [isSignUp]);

  return (
    <div className="fixed z-50 bg-black bg-opacity-50 border border-white/50 rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col p-20 gap-5">
        <SplitText text={'Welcome'} />
        <AnimatePresence>
          {isSignUp ? (
            <motion.input
              value={username}
              onChange={(e) => setUserName(e.currentTarget.value)}
              type="text"
              placeholder="name"
              className="p-2 bg-black border-2 border-gray-600 rounded focus:outline-none focus:border-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
              transition={{
                duration: 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
            />
          ) : (
            ''
          )}
        </AnimatePresence>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="p-2 bg-black border-2 border-gray-600 rounded focus:outline-none focus:border-white"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="p-2 bg-black border-2 border-gray-600 rounded focus:outline-none focus:border-white"
        />
        <motion.button
          type="submit"
          className="p-2 bg-white rounded text-black"
          whileTap={{ scale: 0.9 }}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
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
