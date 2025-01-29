import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import './Dashboard.css';
import Loader from './Loader';
import AdminPanel from './AdminPanel';
import { Link } from 'react-router-dom';
import { setupServiceLogsListener } from '../firebase/db';
import Navbar from './Navbar';

const Dashboard = () => {
    const [studentData, setStudentData] = useState(null);
    const [serviceLogs, setServiceLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completedHours, setCompletedHours] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.log("No authenticated user found");
                    setLoading(false);
                    return;
                }

                // Fetch student data
                const studentRef = doc(db, 'students', user.email);
                const studentDoc = await getDoc(studentRef);
                
                if (studentDoc.exists()) {
                    setStudentData(studentDoc.data());
                    
                    // Setup real-time listener for service logs
                    const unsubscribe = await setupServiceLogsListener(user.email, (hours) => {
                        setCompletedHours(hours);
                        // Re-fetch student data to get updated hours
                        getDoc(studentRef).then(doc => {
                            if (doc.exists()) {
                                setStudentData(doc.data());
                            }
                        });
                    });

                    // Cleanup listener on unmount
                    return () => unsubscribe();
                } else {
                    console.log("No student document found for:", user.email);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) return <Loader />;
    if (!studentData) return <div className="dashboard-container">No student data available. Please contact administrator.</div>;

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <AdminPanel />
                <div className="hours-card">
                    <h2>Service Hours Overview</h2>
                    <div className="hours-stats">
                        <div className="stat-item">
                            <span className="label">Remaining Hours</span>
                            <span className="value">{studentData.service_hours}</span>
                        </div>
                        <div className="stat-item completed">
                            <span className="label">Completed Hours</span>
                            <span className="value">{50 - studentData.service_hours}</span>
                        </div>
                        <div className="stat-item punishment">
                            <span className="label">Punishment Hours</span>
                            <span className="value">{studentData.punishment_hours}</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">Service Centre</span>
                            <span className="value service-centre">
                                {studentData.service_centre_name || 'Not Assigned'}
                            </span>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill"
                            style={{ 
                                width: `${Math.min(100, ((50 - studentData.service_hours) / 50) * 100)}%`
                            }}
                        />
                    </div>
                    <div className="status-badge" data-status={studentData.status[0]}>
                        {studentData.status[0]}
                    </div>
                </div>

                <div className="service-logs-section">
                    <h3>Service History</h3>
                    <div className="logs-container">
                        {serviceLogs.map((log) => (
                            <div key={log.id} className="log-entry">
                                <div className="log-date">{log.date}</div>
                                <div className="log-hours">{log.hours} hours</div>
                                <div className="log-description">{log.description}</div>
                                <div className="log-status" data-status={log.status}>
                                    {log.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
