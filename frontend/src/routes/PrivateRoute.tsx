import {
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom';
import React from 'react';

import { isAuthenticated } from '../utils/auth';

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated() ? (
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