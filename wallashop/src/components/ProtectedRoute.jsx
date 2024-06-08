import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/context';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
