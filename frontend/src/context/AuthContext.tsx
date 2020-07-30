import React, { createContext, useState } from 'react';

const Context = createContext({
  isAuthenticated: false,
  handleLogin: (didAuthenticate: boolean) => {},
})

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function handleLogin(didAuthenticate: boolean) {
    setIsAuthenticated(didAuthenticate);
  }

  return (
    <Context.Provider value={{ isAuthenticated, handleLogin }}>
      { children }
    </Context.Provider>  
  );
}

export { Context, AuthProvider };