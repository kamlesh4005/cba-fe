// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SendVerificationEmail from './pages/SendVerificationEmail';
import VerifyEmail from './pages/VerifyEmail';
import Users from './pages/Users';
import User from './pages/User';
import ProtectedRoute from './ProtectedRoute';
import EventDetails from './components/EventDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/send-verification-email" element={<SendVerificationEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/users/:userId" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="/event/:eventId" element={<ProtectedRoute><Dashboard content={<EventDetails />} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
