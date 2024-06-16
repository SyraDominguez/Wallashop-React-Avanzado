import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store/store";
import InitializeAuth from "./components/InitializeAuth"; // Importa el nuevo archivo
import { AuthContextProvider } from "./pages/auth/context";
import storage from "./storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider isDefaultLogged={!!storage.get("auth")}>
          <InitializeAuth />
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
