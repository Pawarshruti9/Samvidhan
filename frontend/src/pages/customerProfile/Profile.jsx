import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/navbar/navbar.jsx";
import "./Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Fetching user data...");
                const response = await axios.get(
                    "http://localhost:4000/api/users/getcurrentuser",
                    { withCredentials: true }
                );

                if (response.data.success) {
                    console.log("User data fetched successfully:", response.data.user);
                    setUserData(response.data.user);
                } else {
                    console.error("Failed to fetch user data:", response.data.message);
                    toast.error("Failed to load profile data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (error.response?.status === 401) {
                    toast.error("Please log in to view your profile");
                    navigate("/login");
                } else {
                    toast.error("Failed to load profile data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="profile-container">
                <Navbar />
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="profile-container">
                <Navbar />
                <div className="error">Failed to load profile data</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <Navbar />
            <div className="profile-content">
                <h1>User Profile</h1>
                <div className="profile-info">
                    <div className="profile-field">
                        <label>Name:</label>
                        <span>{userData.name}</span>
                    </div>
                    <div className="profile-field">
                        <label>Email:</label>
                        <span>{userData.email}</span>
                    </div>
                    <div className="profile-field">
                        <label>Role:</label>
                        <span>{userData.role || "User"}</span>
                    </div>
                    {/* Add more profile fields as needed */}
                </div>
            </div>
        </div>
    );
};

export default Profile; 