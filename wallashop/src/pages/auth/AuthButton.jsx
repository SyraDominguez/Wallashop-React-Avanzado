import Button from "../../components/button";
import { useAuth } from "./context";
import { logout } from "./service";

import PropTypes from "prop-types";

function AuthButton({ className }) {
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return isLogged ? (
    <Button onClick={handleLogoutClick} className={className}>
      Logout
    </Button>
  ) : (
    <Button $variant="primary" className={className}>
      Login
    </Button>
  );
}

export default AuthButton;
