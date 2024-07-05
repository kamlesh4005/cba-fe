// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BettingInfo from '../components/BettingInfo';
import EventDetails from '../components/EventDetails';
import { logout } from '../slices/authSlice';

const Dashboard = ({ content }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!token || !userData) {
          handleLogout();
        } else {
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        handleLogout();
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const isEventDetailsPage = location.pathname.startsWith('/event/');
  
  return (
    <div className="flex flex-col h-screen">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          {isEventDetailsPage ? <EventDetails /> : <BettingInfo />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
