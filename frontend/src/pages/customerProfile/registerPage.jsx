import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css"; // Ensure this file exists

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:4000/api/users/register",
                {
                    name: username,
                    email,
                    password,
                    role,
                    age,
                    phone,
                },
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                toast.success("Registration successful!", { autoClose: 2000 });
                setTimeout(() => {
                    if (role === 'admin') {
                        navigate("/admin/dashboard");
                    } else {
                        navigate("/");
                    }
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", { autoClose: 2000 });
        }
    };

    return (
        <div className="register-container">
            <ToastContainer /> {/* Required for toasts to work */}

            <form onSubmit={handleSubmit} className="register-form">
                <h1>Register</h1>
                <p>Sign up to create your account</p>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Info@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        placeholder="Your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn">
                    Get Started
                </button>
            </form>
        </div>
    );
};

export default Register;
