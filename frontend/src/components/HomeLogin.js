import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomeLogin.css';
import Loader from './Loader';
import { auth, provider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { createNewStudentDocument, createAdministrator } from '../firebase/db';
import Navbar from './Navbar';

const HomeLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (user) {
            const isValidEmail = user.email.match(/^[\d]{3}a[\d]{3}@sxc\.edu\.np$/);
            if (!isValidEmail) {
                auth.signOut();
                setError('Please use your St. Xavier\'s College email (@sxc.edu.np) to login.');
            }
        }
    }, [user]);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;
            
            const isValidEmail = email.match(/^[\d]{3}a[\d]{3}@sxc\.edu\.np$/);
            if (!isValidEmail) {
                await auth.signOut();
                setError('Please use your St. Xavier\'s College email (@sxc.edu.np) to login.');
                return;
            }

            await createNewStudentDocument(result.user);
        }  finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-login-container">
            <Navbar />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="content">
                        <div className="home-section">
                            <h1>Track & Manage Your Community Service</h1>
                            <p>
                                CST is the digitized and efficient solution for tracking, planning, 
                                and organizing your community service hours. Easily monitor your 
                                progress and achieve milestones with our intuitive platform.
                            </p>
                        </div>
                        <div className="login-section">
                            <p>Welcome to Community Service Tracker</p>
                            <div className="button-group">
                                {!user ? (
                                    <button className="login-button" onClick={handleLogin}>
                                        Login
                                        <span className="arrow-wrapper">
                                            <span className="arrow"></span>
                                        </span>
                                    </button>
                                ) : (
                                    <Link to="/dashboard" className="login-button">
                                        Go to Dashboard
                                        <span className="arrow-wrapper">
                                            <span className="arrow"></span>
                                        </span>
                                    </Link>
                                )}
                                <button className="learn-button" onClick={() => setShowModal(true)}>
                                    Learn More
                                </button>
                            </div>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </div>

                    {showModal && (
                        <div className="modal-overlay" onClick={() => setShowModal(false)}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                <h2>The Team</h2>
                                <p>Created by the talented students of ALCC:</p>
                                <ul>
                                    <li>John Doe - Frontend Developer</li>
                                    <li>Jane Smith - Backend Developer</li>
                                    <li>Mike Johnson - UI/UX Designer</li>
                                </ul>
                                <button className="close-button" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default HomeLogin;