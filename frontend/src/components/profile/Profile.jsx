import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar/navbar.jsx';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Fetching user data...");
                const response = await axios.get('http://localhost:4000/api/users/getcurrentuser', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                console.log("User data response:", response.data);
                
                if (response.data.success) {
                    setUser(response.data.user);
                    // Store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                } else {
                    console.log("Failed to fetch user data:", response.data.message);
                    toast.error('Failed to fetch user data');
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (error.response) {
                    console.error("Error response:", error.response.data);
                    console.error("Error status:", error.response.status);
                    console.error("Error headers:", error.response.headers);
                } else if (error.request) {
                    console.error("Error request:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
                toast.error('Please login to view your profile');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        // Check if user data exists in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log("Found user data in localStorage");
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            console.log("No user data in localStorage, fetching from server");
            fetchUserData();
        }
    }, [navigate]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="loading">Loading...</div>
            </>
        );
    }

    if (!user) {
        return null;
    }

    const getProgressStatus = (module) => {
        const status = user.progress[module];
        switch (status) {
            case 'started':
                return 'Started';
            case 'inprogress':
                return 'In Progress';
            case 'completed':
                return 'Completed';
            default:
                return 'Not Started';
        }
    };

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <ToastContainer />
                <div className="profile-card">
                    <h1>User Profile</h1>
                    <div className="profile-info">
                        <div className="info-group">
                            <label>Name:</label>
                            <span>{user.name}</span>
                        </div>
                        <div className="info-group">
                            <label>Email:</label>
                            <span>{user.email}</span>
                        </div>
                        <div className="info-group">
                            <label>Age:</label>
                            <span>{user.age}</span>
                        </div>
                        <div className="info-group">
                            <label>Phone:</label>
                            <span>{user.phone}</span>
                        </div>

                        <div className="progress-section">
                            <h2>Module Progress</h2>
                            <div className="progress-grid">
                                <div className="progress-item">
                                    <h3>Preamble</h3>
                                    <div className={`status ${user.progress.preamble || 'not-started'}`}>
                                        {getProgressStatus('preamble')}
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <h3>Fundamental Rights</h3>
                                    <div className={`status ${user.progress['fundamental-rights'] || 'not-started'}`}>
                                        {getProgressStatus('fundamental-rights')}
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <h3>Directive Principles</h3>
                                    <div className={`status ${user.progress['directive-principles'] || 'not-started'}`}>
                                        {getProgressStatus('directive-principles')}
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <h3>Fundamental Duties</h3>
                                    <div className={`status ${user.progress['fundamental-duties'] || 'not-started'}`}>
                                        {getProgressStatus('fundamental-duties')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile; 