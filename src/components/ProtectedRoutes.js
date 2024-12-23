import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { isAuthenticated, isAuthInitialized } = useAuth();
  
    if (!isAuthInitialized) {
      return null; // Show nothing or a loading spinner until initialization is complete
    }
  
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    return <Outlet />;
  };
  
  export default ProtectedRoutes;
  
