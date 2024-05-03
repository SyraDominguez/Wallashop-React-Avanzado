import { createContext, useContext, useEffect, useState } from "react";
import storage from "../../storage.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ isDefaultLogged, children }) => {
  const [isLogged, setIsLogged] = useState(isDefaultLogged);

  useEffect(() => {
    const token = storage.get("auth");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};