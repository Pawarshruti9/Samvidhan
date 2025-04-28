import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // Ensure this file exists

const ClientLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Attempting login...");
            const response = await axios.post(
                "http://localhost:4000/api/users/login",
                { email, password },
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            console.log("Login response:", response.data);

            if (response.data.success) {
                console.log("Login successful, redirecting to profile...");
                toast.success("Login successful!", { autoClose: 2000 });

                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Redirect to profile page after successful login
                setTimeout(() => {
                    console.log("Navigating to profile page...");
                    navigate("/profile", { replace: true });
                }, 2000);
            } else {
                console.log("Login failed:", response.data.message);
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response:", error.response.data);
                console.error("Error status:", error.response.status);
                console.error("Error headers:", error.response.headers);
                toast.error(error.response.data.message || "Login failed");
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Error request:", error.request);
                toast.error("Network error. Please check your connection.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="login-container">
            <ToastContainer />

            <form onSubmit={handleSubmit} className="login-form">
                <h1>Log In</h1>
                <p>Access your account</p>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Log In</button>

                <div className="links">
                    <a href="/forgot-password">Forgot Password?</a>
                    <Link to="/register">Don't have an account? Sign up now!</Link>
                </div>
            </form>
        </div>
    );
};

export default ClientLogin;
