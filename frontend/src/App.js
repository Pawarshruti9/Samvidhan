import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main_Router from './router/main_router'; // Handles all routing

function App() {
  return (
    <Router>
      <Main_Router />
    </Router>
  );
}

export default App;
