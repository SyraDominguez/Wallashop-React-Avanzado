import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/actions/authActions";

const SomeComponent = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogin = (event) => {
    event.stopPropagation();
    console.log("Login button clicked");
    dispatch(login({ user: "testUser", token: "abc123" }));
  };

  const handleLogout = (event) => {
    event.stopPropagation();
    console.log("Logout button clicked");
    dispatch(logout());
  };

  return (
    <div>
      <button
        id="loginButton"
        onClick={handleLogin}
        style={{ position: "relative", zIndex: 1000 }}
      >
        Login
      </button>
      <button
        id="logoutButton"
        onClick={handleLogout}
        style={{ position: "relative", zIndex: 1000 }}
      >
        Logout
      </button>
      <div>{`isLoggedIn: ${isLoggedIn}`}</div>
    </div>
  );
};

export default SomeComponent;
