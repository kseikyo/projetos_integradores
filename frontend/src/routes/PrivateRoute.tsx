import {
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom';
import React, { useContext } from 'react';

import { Context } from '../context/AuthContext';

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  const { isAuthenticated } = useContext(Context);



  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: routeProps.location }
              }}
            />
          )
      }
    />
  );
};

export default PrivateRoute;