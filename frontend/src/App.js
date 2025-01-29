import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLogin from './components/HomeLogin';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;