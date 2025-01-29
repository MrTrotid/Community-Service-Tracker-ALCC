import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    const isValidEmail = user.email.match(/^[\d]{3}a[\d]{3}@sxc\.edu\.np$/);
    if (!isValidEmail) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
