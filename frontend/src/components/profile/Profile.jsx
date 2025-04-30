import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from 'html2canvas';
import Navbar from '../navbar/navbar.jsx';
import Certificate from '../Certificate/Certificate.jsx';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCertificate, setShowCertificate] = useState(false);
    const [currentCertificate, setCurrentCertificate] = useState(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            console.log("Fetching fresh user data...");
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

    useEffect(() => {
        // Always fetch fresh data when component mounts
        fetchUserData();

        // Set up an interval to refresh data every 5 seconds
        const intervalId = setInterval(fetchUserData, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [navigate]);

    const handleDownloadCertificate = async (moduleName) => {
        try {
            console.log('Attempting to download certificate for module:', moduleName);
            const response = await axios.get(`http://localhost:4000/api/users/certificate/${moduleName}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            console.log('Certificate response:', response.data);

            if (response.data.success && response.data.certificate) {
                const certificateData = response.data.certificate;
                
                // Validate certificate data
                if (!certificateData.userName || !certificateData.moduleName || !certificateData.completionDate || !certificateData.certificateId) {
                    console.error('Invalid certificate data received:', certificateData);
                    toast.error('Invalid certificate data received from server');
                    return;
                }

                console.log('Setting certificate data:', certificateData);
                setCurrentCertificate(certificateData);
                setShowCertificate(true);

                // Wait for the certificate to render
                setTimeout(async () => {
                    const certificateElement = document.querySelector('.certificate-container');
                    if (certificateElement) {
                        try {
                            const canvas = await html2canvas(certificateElement, {
                                scale: 2,
                                useCORS: true,
                                logging: false,
                                backgroundColor: '#ffffff'
                            });

                            // Convert to PNG and download
                            const link = document.createElement('a');
                            link.download = `${moduleName}-completion-certificate.png`;
                            link.href = canvas.toDataURL('image/png');
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            
                            setShowCertificate(false);
                            toast.success('Certificate downloaded successfully!');
                        } catch (error) {
                            console.error('Error generating certificate image:', error);
                            toast.error('Failed to generate certificate image');
                        }
                    }
                }, 500);
            } else {
                console.error('Invalid certificate data received');
                toast.error('Failed to generate certificate: Invalid data received');
            }
        } catch (error) {
            console.error('Error downloading certificate:', error);
            console.error('Error response:', error.response);
            toast.error(error.response?.data?.message || 'Failed to download certificate');
        }
    };

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
        const status = user.progress?.[module] || 'not-started';
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
                    </div>

                    <div className="progress-section">
                        <h2>Module Progress</h2>
                        <div className="progress-grid">
                            <div className="progress-item">
                                <span>Preamble</span>
                                <span className={`status ${user.progress?.preamble || 'not-started'}`}>
                                    {getProgressStatus('preamble')}
                                </span>
                                {user.progress?.preamble === 'completed' && (
                                    <button 
                                        className="download-btn"
                                        onClick={() => handleDownloadCertificate('preamble')}
                                    >
                                        Download Certificate
                                    </button>
                                )}
                            </div>
                            <div className="progress-item">
                                <span>Fundamental Rights</span>
                                <span className={`status ${user.progress?.['fundamental-rights'] || 'not-started'}`}>
                                    {getProgressStatus('fundamental-rights')}
                                </span>
                                {user.progress?.['fundamental-rights'] === 'completed' && (
                                    <button 
                                        className="download-btn"
                                        onClick={() => handleDownloadCertificate('fundamental-rights')}
                                    >
                                        Download Certificate
                                    </button>
                                )}
                            </div>
                            <div className="progress-item">
                                <span>Directive Principles</span>
                                <span className={`status ${user.progress?.['directive-principles'] || 'not-started'}`}>
                                    {getProgressStatus('directive-principles')}
                                </span>
                                {user.progress?.['directive-principles'] === 'completed' && (
                                    <button 
                                        className="download-btn"
                                        onClick={() => handleDownloadCertificate('directive-principles')}
                                    >
                                        Download Certificate
                                    </button>
                                )}
                            </div>
                            <div className="progress-item">
                                <span>Fundamental Duties</span>
                                <span className={`status ${user.progress?.['fundamental-duties'] || 'not-started'}`}>
                                    {getProgressStatus('fundamental-duties')}
                                </span>
                                {user.progress?.['fundamental-duties'] === 'completed' && (
                                    <button 
                                        className="download-btn"
                                        onClick={() => handleDownloadCertificate('fundamental-duties')}
                                    >
                                        Download Certificate
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {showCertificate && currentCertificate && (
                    <div style={{ position: 'fixed', left: '-9999px' }}>
                        <Certificate certificate={currentCertificate} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile; 