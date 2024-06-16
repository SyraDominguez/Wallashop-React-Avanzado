import { Link, useLocation } from "react-router-dom";
import Button from "../../components/button";
import { useAuth } from "./context";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout as apiLogout } from "./service";
import { logout } from "../../store/actions/authActions";

function AuthButton({ className }) {
  const { isLogged, onLogout } = useAuth();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await apiLogout();
    dispatch(logout());
    onLogout();
  };

  const openConfirmDialog = () => {
    setShowConfirm(true);
  };

  const closeConfirmDialog = () => {
    setShowConfirm(false);
  };

  const confirmLogout = () => {
    closeConfirmDialog();
    handleLogout();
  };

  if (location.pathname === "/login") {
    return null;
  }

  return isLogged ? (
    <>
      <Button onClick={openConfirmDialog} className={className}>
        Logout
      </Button>
      {showConfirm && (
        <ConfirmDialog
          message="¿De verdad que quieres cerrar sesión?"
          onConfirm={confirmLogout}
          onCancel={closeConfirmDialog}
        />
      )}
    </>
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
