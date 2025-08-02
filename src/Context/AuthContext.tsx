import { createContext, useContext, useEffect, useState } from "react";
import { getStorage, removeStorage, setStorage } from "../Hooks/localstorage";
import { useLocation } from "react-router-dom";

interface User {
  username: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login") return;
    const savedUser = getStorage("user") as User | null;
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    setStorage("user", user);
  };
  const logout = () => {
    setUser(null);
    removeStorage("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
