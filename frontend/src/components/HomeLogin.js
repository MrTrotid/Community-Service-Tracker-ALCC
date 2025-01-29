import React, { useState, useEffect } from 'react';
import './HomeLogin.css';
import Loader from './Loader';
import { auth, provider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';

const HomeLogin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            setError('Failed to log in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-login-container">
            <nav className="navbar">
                <h2>Community Service Tracker</h2>
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </div>
            </nav>
            
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
                            <p>Login with your college email</p>
                            <div className="button-group">
                                <button className="login-button" onClick={handleLogin}>
                                    Login
                                    <span className="arrow-wrapper">
                                        <span className="arrow"></span>
                                    </span>
                                </button>
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