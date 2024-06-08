// src/auth/context.jsx
import { createContext, useContext, useState } from "react";
import storage from "../../storage.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ isDefaultLogged, children }) => {
  const [isLogged, setIsLogged] = useState(isDefaultLogged);

  const handleLogin = () => {
    setIsLogged(true);
    storage.set("auth", true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    storage.remove("auth");
  };

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
