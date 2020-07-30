import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import React, { useEffect, useContext } from 'react';

import Logon from '../pages/Logon/index';
import Disciplines from '../pages/Disciplines/index';
import Scores from '../pages/Scores/index';
import Students from '../pages/Students/index';

import api from '../api/api';

import PrivateRoute from './PrivateRoute';
import { AuthProvider, Context } from '../context/AuthContext';

const Routes = () => {

  const { handleLogin } = useContext(Context);

  useEffect(() => {
    api.post('/refresh_token').then(async req => {
      const accessToken = await req.data.accessToken;
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      handleLogin(true);
    })
  }, [handleLogin]);

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