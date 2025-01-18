import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Ensure this import is correct

function App() {
  return (
    <Router>
      <div>
        <h1>Community Service Tracker</h1>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ensure this is correct */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;