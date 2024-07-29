// src/slices/eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/axios/api';

export const fetchEventDetails = createAsyncThunk(
  'event/fetchEventDetails',
  async (eventId) => {
    const response = await api.get(`/events/detail/${eventId}`);
    return response.data;
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    eventDetails: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eventDetails = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
