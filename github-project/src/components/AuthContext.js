import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    username: null,
  });

  const login = (token, username) => {
    setAuthState({ isAuthenticated: true, token, username });
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, token: null, username: null });
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};