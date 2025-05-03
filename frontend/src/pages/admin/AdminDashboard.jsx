import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/navbar/navbar.jsx';
import ContentManagement from './ContentManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('users');
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        age: '',
        phone: ''
    });

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users/getalluser', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (response.data.success) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/users/delete/${userId}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (response.data.success) {
                    toast.success('User deleted successfully');
                    fetchUsers();
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Failed to delete user');
            }
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/register', newUser, {
                withCredentials: true
            });
            if (response.data.success) {
                toast.success('User added successfully');
                setNewUser({
                    name: '',
                    email: '',
                    password: '',
                    role: 'user',
                    age: '',
                    phone: ''
                });
                fetchUsers();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add user');
        }
    };

    const getProgressStatus = (progress, moduleName) => {
        if (!progress || !progress[moduleName]) return 'Not Started';
        return progress[moduleName].charAt(0).toUpperCase() + progress[moduleName].slice(1);
    };

    if (loading && activeTab === 'users') {
        return (
            <div className="admin-container">
                <Navbar />
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <Navbar />
            <ToastContainer />
            <div className="admin-content">
                <h1>Admin Dashboard</h1>
                
                <div className="admin-tabs">
                    <button 
                        className={activeTab === 'users' ? 'active' : ''}
                        onClick={() => setActiveTab('users')}
                    >
                        User Management
                    </button>
                    <button 
                        className={activeTab === 'content' ? 'active' : ''}
                        onClick={() => setActiveTab('content')}
                    >
                        Content Management
                    </button>
                </div>

                {activeTab === 'users' ? (
                    <>
                        {/* Add User Form */}
                        <div className="add-user-form">
                            <h2>Add New User</h2>
                            <form onSubmit={handleAddUser}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={newUser.age}
                                        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={newUser.phone}
                                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="submit-btn">Add User</button>
                            </form>
                        </div>

                        {/* Users List */}
                        <div className="users-list">
                            <h2>All Users</h2>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Progress</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <div className="progress-details">
                                                        <div className="progress-item">
                                                            <span className="module-name">Preamble:</span>
                                                            <span className={`status ${user.progress?.preamble || 'not-started'}`}>
                                                                {getProgressStatus(user.progress, 'preamble')}
                                                            </span>
                                                        </div>
                                                        <div className="progress-item">
                                                            <span className="module-name">Fundamental Rights:</span>
                                                            <span className={`status ${user.progress?.['fundamental-rights'] || 'not-started'}`}>
                                                                {getProgressStatus(user.progress, 'fundamental-rights')}
                                                            </span>
                                                        </div>
                                                        <div className="progress-item">
                                                            <span className="module-name">Directive Principles:</span>
                                                            <span className={`status ${user.progress?.['directive-principles'] || 'not-started'}`}>
                                                                {getProgressStatus(user.progress, 'directive-principles')}
                                                            </span>
                                                        </div>
                                                        <div className="progress-item">
                                                            <span className="module-name">Fundamental Duties:</span>
                                                            <span className={`status ${user.progress?.['fundamental-duties'] || 'not-started'}`}>
                                                                {getProgressStatus(user.progress, 'fundamental-duties')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button 
                                                        className="delete-btn"
                                                        onClick={() => handleDeleteUser(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <ContentManagement />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard; 