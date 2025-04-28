import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminLogin.css";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:4000/api/users/login",
                { email, password, isAdmin: true },
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                toast.success("Admin login successful!");
                navigate("/admin/dashboard");
            } else {
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <ToastContainer />

            <form onSubmit={handleSubmit} className="admin-login-form">
                <h1>Admin Login</h1>
                <p>Access admin dashboard</p>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter admin email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="links">
                    <Link to="/login" className="back-link">← Back to User Login</Link>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin; 