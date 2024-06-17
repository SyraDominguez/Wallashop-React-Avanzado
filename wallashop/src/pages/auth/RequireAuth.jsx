import { Navigate } from "react-router-dom";
import { useAuth } from "./context"; // Ajustar la ruta
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
