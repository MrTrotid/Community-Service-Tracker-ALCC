import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { checkAdministrator } from '../firebase/db';
import AdminPanel from '../components/AdminPanel';
import { auth } from '../firebase/config';
import Navbar from '../components/Navbar';

const AdminPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAccess = async () => {
            if (!user) {
                navigate('/');
                return;
            }
            
            try {
                const adminData = await checkAdministrator(user.email);
                if (!adminData) {
                    navigate('/dashboard');
                    return;
                }
                setIsAdmin(true);
            } catch (error) {
                console.error('Admin check failed:', error);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        
        checkAccess();
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!isAdmin) return null;

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h1>Admin Panel</h1>
                <AdminPanel />
            </div>
        </>
    );
};

export default AdminPage;
