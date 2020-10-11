import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("token", []);

  const storeToken = (token) => {
    setAuth((prevToken) => {
      return [...prevToken, token];
    });
  };

  return (
    <AuthContext.Provider value={{ auth, storeToken }}>
      {children}
    </AuthContext.Provider>
  );
};
