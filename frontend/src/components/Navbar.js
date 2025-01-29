import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar">
            <h2>Community Service Tracker</h2>
            <div className="nav-links">
                {user ? (
                    <>
                        <div className="left-links">
                            <Link to="/dashboard">Dashboard</Link>
                        </div>
                        <div className="right-links">
                            <Link to="/admin">Admin Panel</Link>
                            <Link to="/" onClick={handleLogout}>Logout</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
