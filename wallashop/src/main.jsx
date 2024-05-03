import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import storage from "./storage.js";
import { setAuthorizationHeader } from "./api/client.js";
import { AuthContextProvider } from "./pages/auth/context.jsx";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider isDefaultLogged={!!accessToken}>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
