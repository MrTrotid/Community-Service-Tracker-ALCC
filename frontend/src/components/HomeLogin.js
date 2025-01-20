import React, { useState, useEffect } from 'react';
import './HomeLogin.css'; // Import the CSS file
import Loader from './Loader'; // Import the Loader component
import { auth, provider } from '../firebase/config'; // Firebase config
import { signInWithPopup } from 'firebase/auth';
import googleLogo from '../assets/google-logo.png'; // Import the Google logo

const HomeLogin = () => {
    const [loading, setLoading] = useState(true); // Initial loading state
    const [error, setError] = useState('');

    useEffect(() => {
        // Simulate a loading delay (e.g., fetching data)
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, provider);
            // Handle successful login (e.g., redirect or update state)
        } catch (error) {
            setError('Failed to log in with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-login-container">
            {loading ? (
                <Loader /> // Show loader while loading
            ) : (
                <div className="content">
                    <div className="home-section">
                        <h1>Community Service Tracker</h1>
                        <p>What is community service tracker and how does it work</p>
                    </div>
                    <div className="login-section">
                        <p>Login with college mail to continue</p>
                        <button className="google-login-button" onClick={handleGoogleLogin}>
                            <img src={googleLogo} alt="Google Logo" className="google-logo" />
                            Login with Google
                        </button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeLogin;
