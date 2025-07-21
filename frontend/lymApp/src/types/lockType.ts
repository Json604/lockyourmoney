import { ReactNode } from "react";

export type LockContextType = {
  lockedAmount: string;
  setLockedAmount: (val: string) => void;
  lockedDays: number;
  setLockedDays: (val: number) => void;
  storedTill: string | null;
  setStoredTill: (val: string | null) => void;
};

export type LockProviderProps = {
  children: ReactNode;
};
