import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../auth/context";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
