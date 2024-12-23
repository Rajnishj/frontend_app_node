import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  
    useEffect(() => {
      const storedAuth = localStorage.getItem("isAuthenticated");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
      setIsAuthInitialized(true); // Mark authentication as initialized
    }, []);
  
    const login = () => {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    };
  
    const logout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, isAuthInitialized, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
