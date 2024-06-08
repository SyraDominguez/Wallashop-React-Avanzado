import AdsPage from "./pages/ads/adsPage";
import NewAdPage from "./pages/ads/newAdPage";
import LoginPage from "./pages/auth/loginPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdDetailPage from "./pages/ads/adDetailPage";
import RequireAuth from "./pages/auth/RequireAuth";
import Error404 from "./components/error404";
import { AuthContextProvider } from "./pages/auth/context";
import storage from "./storage.js";

function App() {
  const isDefaultLogged = !!storage.get("auth");

  return (
    <AuthContextProvider isDefaultLogged={isDefaultLogged}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/ads"
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        >
          <Route index element={<AdsPage />} />
          <Route path=":adsId" element={<AdDetailPage />} />
          <Route path="new" element={<NewAdPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/ads" />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
