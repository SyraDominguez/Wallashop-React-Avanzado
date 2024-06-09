import { createContext, useContext, useState, useEffect } from "react";
import storage from "../../storage.js";

import PropTypes from "prop-types";

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
    // No elimino savedEmail ni rememberMe para mantener el email guardado.
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

AuthContextProvider.propTypes = {
  isDefaultLogged: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
