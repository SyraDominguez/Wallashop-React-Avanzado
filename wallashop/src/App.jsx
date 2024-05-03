import { useState, useEffect } from "react";
import AdsPage from "./pages/ads/adsPage";
import NewAdPage from "./pages/ads/newAdPage";
import LoginPage from "./pages/auth/loginPage";
import storage from "./storage";

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

  return (
    <div>
      {isLogged ? (
        // <NewAdPage onLogout={handleLogout} isLogged={isLogged} />
        <AdsPage onLogout={handleLogout} isLogged={isLogged} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
