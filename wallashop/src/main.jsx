import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import storage from "./storage.js";
import { setAuthorizationHeader } from "./api/client.js";
import { AuthContextProvider } from "./pages/auth/context.jsx";
import { BrowserRouter } from "react-router-dom";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider isDefaultLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
