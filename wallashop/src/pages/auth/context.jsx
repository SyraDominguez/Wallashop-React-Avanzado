import { createContext, useContext, useState, useEffect } from "react";
import storage from "../../storage.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ isDefaultLogged, children }) => {
  const [isLogged, setIsLogged] = useState(isDefaultLogged);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = storage.get("user");
    if (storedUser) {
      setIsLogged(true);
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLogged(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLogged(false);
    setUser(null);
    storage.remove("auth");
    storage.remove("user");
    // No eliminamos savedEmail ni rememberMe para mantener el email guardado.
  };

  const authValue = {
    isLogged,
    user,
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
