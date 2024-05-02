import { useState } from "react";
import AdsPage from "./pages/ads/adsPage";
import LoginPage from "./pages/auth/loginPage";

function App({ isDefaultLogged }) {
  const [isLogged, setIsLogged] = useState(isDefaultLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div>
      {" "}
      {isLogged ? (
        <AdsPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}{" "}
    </div>
  );
}

export default App;
