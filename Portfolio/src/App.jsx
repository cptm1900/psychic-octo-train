import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';
import Pop from './pages/Pop';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/pop" element={<Pop />} />
    </Routes>
  );
}

export default App;