// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios/api';
import { logout } from '../slices/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          const response = await api.get(`/v1/users/${userData.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
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

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome, {user.name} ({user.email})</p>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </header>
      {/* Add the rest of your dashboard content here */}
    </div>
  );
};

export default Dashboard;
