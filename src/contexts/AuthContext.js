import React, { createContext, useState, useEffect } from 'react';
import userPool from '../services/aws';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (!err && session.isValid()) {
          setIsAuthenticated(true);
        }
      });
    }
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
