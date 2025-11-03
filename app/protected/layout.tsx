'use client';
import { ReactNode } from 'react';
import { useUser } from '../lib/auth';
import AuthGuard from './components/AuthGuard';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../components/QueryClient';
import { useLogoutStore } from '../store/useLogoutStore';

export default function Layout({ children }: { children: ReactNode }) {
  const user = useUser();
  const { isLoggingOut, setIsLoggingOut } = useLogoutStore();

  if (user == false) return <div>Loading...</div>;
  if (!user && !isLoggingOut) return <AuthGuard />;

  return (
    <div className="">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
