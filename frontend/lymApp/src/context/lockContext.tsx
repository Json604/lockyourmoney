import { createContext, useContext, useState, ReactNode } from "react";

type LockContextType = {
  lockedAmount: string;
  setLockedAmount: (value: string) => void;
  lockedDays: number;
  setLockedDays: (value: number) => void;
  storedTill: string | null;
  setStoredTill: (value: string | null) => void;
};

const LockContext = createContext<LockContextType | undefined>(undefined);

export const useLockContext = () => {
  const context = useContext(LockContext);
  if (!context) {
    throw new Error("useLockContext must be used within a LockProvider");
  }
  return context;
};

export const LockProvider = ({ children }: { children: ReactNode }) => {
  const [lockedAmount, setLockedAmount] = useState("");
  const [lockedDays, setLockedDays] = useState<number>(0);
  const [storedTill, setStoredTill] = useState<string | null>(null);

  return (
    <LockContext.Provider
      value={{
        lockedAmount,
        setLockedAmount,
        lockedDays,
        setLockedDays,
        storedTill,
        setStoredTill,
      }}
    >
      {children}
    </LockContext.Provider>
  );
};
