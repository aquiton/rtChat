import { create } from "zustand";

type LogoutState = {
  isLoggingOut: boolean;
  setIsLoggingOut: (val: boolean) => void;
};

export const useLogoutStore = create<LogoutState>((set) => ({
  isLoggingOut: false,
  setIsLoggingOut: (val) => set({ isLoggingOut: val }),
}));
