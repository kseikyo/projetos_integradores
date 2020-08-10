import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext({
  loading: false,
  isAuthenticated: false,
  handleLogin: (didAuthenticate: boolean) => { },
  handleLogout: () => { },
})

const AuthProvider: React.FC = ({ children }) => {
  const { loading, handleLogin, isAuthenticated, handleLogout } = useAuth();

  return (
    <Context.Provider value={{ loading, isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };