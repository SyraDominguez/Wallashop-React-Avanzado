import AdsPage from "./pages/ads/adsPage";
import NewAdPage from "./pages/ads/newAdPage";
import { useAuth } from "./pages/auth/context";
import LoginPage from "./pages/auth/loginPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { isLogged } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ads" />} />
      <Route path="/ads" element={<AdsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ads/:adsId" element={<div>Detalle del Anuncio</div>} />
      <Route path="/new" element={<NewAdPage />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
