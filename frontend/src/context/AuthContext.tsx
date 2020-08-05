import React, { createContext, useState, useEffect } from 'react';

import api from '../api';

const Context = createContext({
  isAuthenticated: false,
  handleLogin: (didAuthenticate: boolean) => {},
})

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    api.post('/refresh_token').then(async req => {
      const accessToken = await req.data.accessToken;
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      console.log(`setting is auth to TRUE`);
      setIsAuthenticated(true); 
    })
  }, []);

  function handleLogin(didAuthenticate: boolean) {
    console.log(`Setting isAuth from ${isAuthenticated} to`);
    setIsAuthenticated(didAuthenticate);
    console.log(`${didAuthenticate}`);
  }
  
  return (
    <Context.Provider value={{ isAuthenticated, handleLogin }}>
      { children }
    </Context.Provider>  
  );
}

export { Context, AuthProvider };