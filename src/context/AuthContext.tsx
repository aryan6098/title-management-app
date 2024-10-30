import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { signIn, logout } from "../store/services/authService";
import { clearUser, setError } from "../store/authSlice";
import { RootState } from "../store"; // Import your RootState type
import { useAppDispatch } from "../hook/reduxHooks";

interface AuthContextProps {
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { error } = useSelector((state: RootState) => state.auth);
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));


  const login = async (email: string, password: string) => {
    try {
      await dispatch(signIn(email, password)); 
    } catch (error: any) {
      console.log("error")
      const errorMessage = error.message || "Invalid credentials";
      dispatch(setError(errorMessage)); // Dispatch error to Redux
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    dispatch(clearUser());
    toast.info("You have been logged out successfully.");
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      dispatch(clearUser()); // Clear user if no token found
    }
    setIsAuthenticated(!!token);
  }, [dispatch, token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, error, login, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside a <AuthProvider />");
  }
  return context;
};
