import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import React from 'react';

import Logon from '../pages/Logon/index';
import Disciplines from '../pages/Disciplines/index';
import Scores from '../pages/Scores/index';
import Students from '../pages/Students/index';


import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../context/AuthContext';

const Routes = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route component={Logon} path="/" exact/>
          <PrivateRoute component={Disciplines} path="/disciplines" />
          <PrivateRoute component={Scores} path="/scores" />
          <PrivateRoute component={Students} path="/students" />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default Routes;