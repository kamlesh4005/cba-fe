// src/services/apiService.js
import axios from 'axios';
import store from '../store'; // Import the store

const API_URL = 'http://localhost:3001/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }
});

// Interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token; // Get the token from Redux state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchMenuData = async () => {
  try {
    const response = await axiosInstance.get('/marketprovider/menu');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return [];
  }
};

export const fetchEventDetails = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/events/detail/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};