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
            const response = await axios.post(
                "http://localhost:4000/api/users/login",
                { email, password },
                { withCredentials: true }
            );

            console.log(response.data);

            if (response.data.success) {
                toast.success("Login successful!", { autoClose: 2000 });

                // Delay navigation slightly to ensure toast is visible
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Invalid credentials. Please try again.",
                { autoClose: 2000 }
            );
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
