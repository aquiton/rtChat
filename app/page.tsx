'use client';
import Login from './components/Login';

export default function Home() {
  // ROOT PAGE

  return (
    <div className="flex flex-col h-screen bg-black justify-center items-center text-white">
      <Login />
    </div>
  );
}
