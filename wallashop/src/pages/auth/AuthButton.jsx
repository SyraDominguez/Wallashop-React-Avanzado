import { Link, useLocation } from "react-router-dom";
import Button from "../../components/button";
import { useAuth } from "./context";
import { logout } from "./service";

import PropTypes from "prop-types";

function AuthButton({ className }) {
  const { isLogged, onLogout } = useAuth();
  const location = useLocation();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  if (location.pathname === "/login") {
    return null; // No renderizar ningún botón si estamos en la página de login
  }

  return isLogged ? (
    <Button onClick={handleLogoutClick} className={className}>
      Logout
    </Button>
  ) : (
    <Button $variant="primary" className={className} as={Link} to="/login">
      Login
    </Button>
  );
}

AuthButton.propTypes = {
  className: PropTypes.string,
};

export default AuthButton;
