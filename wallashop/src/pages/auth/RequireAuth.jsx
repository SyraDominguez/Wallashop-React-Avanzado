import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context";

import PropTypes from "prop-types";

function RequireAuth({ children }) {
  const Location = useLocation();
  const { isLogged } = useAuth();

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: Location }} />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
