"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserLoginContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const UserLoginContext = createContext<UserLoginContextType | undefined>(undefined);

export const UserLoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <UserLoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserLoginContext.Provider>
  );
};

export const useUserLogin = () => {
  const context = useContext(UserLoginContext);
  if (context === undefined) {
    throw new Error("useUserLogin must be used within a UserLoginProvider");
  }
  return context;
};
