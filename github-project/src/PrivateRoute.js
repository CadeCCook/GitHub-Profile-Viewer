import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('authToken'); 

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;