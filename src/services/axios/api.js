// src/services/axios/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user ');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
