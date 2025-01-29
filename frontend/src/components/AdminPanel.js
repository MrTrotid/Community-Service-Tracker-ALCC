import React, { useState, useEffect } from 'react';
import { addVerifiedServiceLog, checkAdministrator } from '../firebase/db';
import { useAuth } from '../contexts/AuthContext';

const AdminPanel = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            if (user?.email) {
                try {
                    const adminStatus = await checkAdministrator(user.email);
                    setIsAdmin(adminStatus);
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setMessage('Error checking permissions');
                } finally {
                    setLoading(false);
                }
            }
        };
        checkAdmin();
    }, [user]);

    const handleAddHours = async () => {
        try {
            await addVerifiedServiceLog('023a411@sxc.edu.np');
            setMessage('Successfully added 10 hours');
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    if (!isAdmin) return null;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button onClick={handleAddHours} style={{ background: '#3498db' }}>
                    Add 10 Test Hours
                </button>
            </div>
            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
        </div>
    );
};

export default AdminPanel;
