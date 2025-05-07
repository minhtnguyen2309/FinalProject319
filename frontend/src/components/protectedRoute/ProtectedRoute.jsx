import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until AuthProvider finishes checking token
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If logged in, show the protected page
  return children;
};

export default ProtectedRoute;
