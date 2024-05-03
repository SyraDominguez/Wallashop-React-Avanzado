import AdsPage from "./pages/ads/adsPage";
import NewAdPage from "./pages/ads/newAdPage";
import { useAuth } from "./pages/auth/context";
import LoginPage from "./pages/auth/loginPage";

function App() {
  const { isLogged } = useAuth();
  return (
    <div>
      {isLogged ? (
        // <NewAdPage />
        <AdsPage />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
