import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// Function to logout the user
const handleLogout = () => {
    const refresh = localStorage.getItem('refreshToken');
    const navigate = Navigate();

    // Call backend to invalidate refresh token
    axios
        .delete('/auth/logout', { data: { token: refresh } })
        .catch((err) => console.warn('Logout request failed', err))
        .finally(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            delete axios.defaults.headers.common['Authorization'];
            navigate('/login');
        });
};

export default handleLogout;
