// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import eventReducer from './slices/eventSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    event: eventReducer,
  },
});

export default store;
