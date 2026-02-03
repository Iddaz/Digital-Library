import React from 'react';
import { Navigate } from 'react-router-dom';

// Component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to='/login' replace />;
    return children;
};

export default PrivateRoute;
