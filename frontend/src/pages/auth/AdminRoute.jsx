import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Component to protect routes that require admin authentication
const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        
        // Check if user is admin
        if (!decodedToken.admin) {
            return <Navigate to="/" replace />;
        }

        return children;
    } catch (err) {
        console.log('Invalid token:', err);
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoute;
