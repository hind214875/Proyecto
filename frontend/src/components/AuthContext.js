import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(
    JSON.parse(localStorage.getItem("authData"))
  );

  const signIn = (userData) => {
    localStorage.setItem("authData", JSON.stringify(userData));
    setAuthState(userData);
  };

  const signOut = () => {
    localStorage.removeItem("authData");
    setAuthState(null);
  };

  return (
    <AuthContext.Provider value={{ authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
