import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main_Router from './router/main_router'; // Handles all routing
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Main_Router />
    </Router>
  );
}

export default App;
