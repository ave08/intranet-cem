import { createContext, useContext, useState, ReactNode } from "react";

/* ================= TYPES ================= */

interface AppContextType {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;

  pendingAccess: number;
  setPendingAccess: React.Dispatch<React.SetStateAction<number>>;

  pendingPosts: number;
  setPendingPosts: React.Dispatch<React.SetStateAction<number>>;
}

/* ================= CONTEXT ================= */

const AppContext = createContext<AppContextType | null>(null);

/* ================= PROVIDER ================= */

export function AppProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingAccess, setPendingAccess] = useState(0);
  const [pendingPosts, setPendingPosts] = useState(0);

  return (
    <AppContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        pendingAccess,
        setPendingAccess,
        pendingPosts,
        setPendingPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}