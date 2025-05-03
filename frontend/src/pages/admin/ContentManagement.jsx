import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContentManagement.css';

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('modules');
    const [modules, setModules] = useState([]);
    const [cards, setCards] = useState([]);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newContent, setNewContent] = useState({
        title: '',
        description: '',
        content: '',
        metadata: {}
    });

    useEffect(() => {
        fetchContent();
    }, [activeTab]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:4000/api/content/${activeTab}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            if (response.data.success) {
                switch (activeTab) {
                    case 'modules':
                        setModules(response.data.modules || []);
                        break;
                    case 'cards':
                        setCards(response.data.cards || []);
                        break;
                    case 'games':
                        setGames(response.data.games || []);
                        break;
                }
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            if (error.response?.status === 401) {
                toast.error('Please login to access this content');
                // Redirect to login page
                window.location.href = '/admin/login';
            } else {
                toast.error('Failed to fetch content');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (type, id, data) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/content/${type}/${id}`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            if (response.data.success) {
                toast.success('Content updated successfully');
                fetchContent();
            }
        } catch (error) {
            console.error('Error updating content:', error);
            if (error.response?.status === 401) {
                toast.error('Please login to update content');
                window.location.href = '/admin/login';
            } else {
                toast.error('Failed to update content');
            }
        }
    };

    const handleDelete = async (type, id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await axios.delete(
                    `http://localhost:4000/api/content/${type}/${id}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                );
                
                if (response.data.success) {
                    toast.success('Content deleted successfully');
                    fetchContent();
                }
            } catch (error) {
                console.error('Error deleting content:', error);
                if (error.response?.status === 401) {
                    toast.error('Please login to delete content');
                    window.location.href = '/admin/login';
                } else {
                    toast.error('Failed to delete content');
                }
            }
        }
    };

    const handleAdd = async (type, data) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/api/content/${type}`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            if (response.data.success) {
                toast.success('Content added successfully');
                fetchContent();
            }
        } catch (error) {
            console.error('Error adding content:', error);
            if (error.response?.status === 401) {
                toast.error('Please login to add content');
                window.location.href = '/admin/login';
            } else {
                toast.error('Failed to add content');
            }
        }
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleModalClose = () => {
        setShowAddModal(false);
        setNewContent({
            title: '',
            description: '',
            content: '',
            metadata: {}
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const contentData = {
                ...newContent,
                type: activeTab
            };
            await handleAdd(activeTab, contentData);
            handleModalClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to add content');
        }
    };

    return (
        <div className="content-management">
            <ToastContainer />
            <div className="content-tabs">
                <button 
                    className={activeTab === 'modules' ? 'active' : ''}
                    onClick={() => setActiveTab('modules')}
                >
                    Modules
                </button>
                <button 
                    className={activeTab === 'cards' ? 'active' : ''}
                    onClick={() => setActiveTab('cards')}
                >
                    Cards
                </button>
                <button 
                    className={activeTab === 'games' ? 'active' : ''}
                    onClick={() => setActiveTab('games')}
                >
                    Games
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="content-list">
                    {activeTab === 'modules' && (
                        <div className="modules-list">
                            <h2>Manage Modules</h2>
                            <button className="add-btn" onClick={handleAddClick}>
                                Add New Module
                            </button>
                            {modules.map(module => (
                                <div key={module._id} className="content-item">
                                    <h3>{module.title}</h3>
                                    <p>{module.description}</p>
                                    <div className="actions">
                                        <button onClick={() => {/* Edit module */}}>Edit</button>
                                        <button onClick={() => handleDelete('modules', module._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'cards' && (
                        <div className="cards-list">
                            <h2>Manage Cards</h2>
                            <button className="add-btn" onClick={() => {/* Add card form */}}>
                                Add New Card
                            </button>
                            {cards.map(card => (
                                <div key={card._id} className="content-item">
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                    <div className="actions">
                                        <button onClick={() => {/* Edit card */}}>Edit</button>
                                        <button onClick={() => handleDelete('cards', card._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'games' && (
                        <div className="games-list">
                            <h2>Manage Games</h2>
                            <button className="add-btn" onClick={() => {/* Add game form */}}>
                                Add New Game
                            </button>
                            {games.map(game => (
                                <div key={game._id} className="content-item">
                                    <h3>{game.title}</h3>
                                    <p>{game.description}</p>
                                    <div className="actions">
                                        <button onClick={() => {/* Edit game */}}>Edit</button>
                                        <button onClick={() => handleDelete('games', game._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newContent.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newContent.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={newContent.content}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={handleModalClose}>Cancel</button>
                                <button type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentManagement; 