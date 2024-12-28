// features/calendar/calendarSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventService from './eventServices';

export const fetchEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async (_, thunkAPI) => {
    try {
      return await eventService.getAllEvents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const addEvent = createAsyncThunk(
  'calendar/addEvent',
  async (eventData, thunkAPI) => {
    try {
      return await eventService.createEvent(eventData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const editEvent = createAsyncThunk(
  'calendar/editEvent',
  async ({ eventId, eventData }, thunkAPI) => {
    try {
      return await eventService.updateEvent(eventId, eventData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const removeEvent = createAsyncThunk(
  'calendar/removeEvent',
  async (eventId, thunkAPI) => {
    try {
      await eventService.deleteEvent(eventId);
      return eventId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.events = [];
      })
      .addCase(addEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.events.findIndex(
          (event) => event._id === action.payload._id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(removeEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = calendarSlice.actions;
export default calendarSlice.reducer;