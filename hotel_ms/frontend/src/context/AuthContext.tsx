import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from "axios";

export type Role = "user" | "admin" | null;

interface AuthContextProps {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);

  // 从localStorage加载角色
  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole as Role);
    }
  }, []);

  const login = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return <AuthContext.Provider value={{ role, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
