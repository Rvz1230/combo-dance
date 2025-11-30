import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
  login: (username: string, password: string) => false,
  lastActivityTime: Date.now()
});
