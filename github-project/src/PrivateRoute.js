import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('authToken'); // Check if the user is authenticated

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return element; // Allow access to the protected route if authenticated
};

export default PrivateRoute;