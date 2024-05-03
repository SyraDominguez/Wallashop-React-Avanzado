import { useState, useEffect } from "react";
import AdsPage from "./pages/ads/adsPage";
import NewAdPage from "./pages/ads/newAdPage";
import LoginPage from "./pages/auth/loginPage";
import storage from "./storage";
import { AuthContext } from "./pages/auth/context";

function App({ isDefaultLogged }) {
  const [isLogged, setIsLogged] = useState(false);

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
    <AuthContext.Provider value={authValue}>
      <div>
        {isLogged ? (
          <NewAdPage />
        ) : (
          // <AdsPage />
          <LoginPage />
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
