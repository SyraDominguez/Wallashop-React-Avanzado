import AdsPage from "./pages/ads/adsPage";
import NewAdPage from "./pages/ads/newAdPage";
import { useAuth } from "./pages/auth/context";
import LoginPage from "./pages/auth/loginPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdDetailPage from "./pages/ads/adDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/ads"
        element={
          <div>
            <Outlet />
          </div>
        }
      >
        <Route index element={<AdsPage />} />
        <Route path=":adsId" element={<AdDetailPage />} />
        <Route path="new" element={<NewAdPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/ads" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
