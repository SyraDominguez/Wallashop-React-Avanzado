import { useState } from "react";

import AdsPage from "./pages/ads/adsPage";
import LoginPage from "./pages/auth/loginPage";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(true);
  };

  return (
    <div> {isLogged ? <AdsPage /> : <LoginPage onLogin={handleLogin} />} </div>
  );
}

export default App;
