// services/eventService.js
import axios from 'axios';
import { config } from '../../utils/axiosconfig';

const API_URL = 'http://localhost:8000/api';

const getAllEvents = async () => {
  const response = await axios.get(`${API_URL}/events`, config);
  return response.data;
};

const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData, config);
  return response.data;
};

const updateEvent = async (eventId, eventData) => {
  const response = await axios.put(`${API_URL}/events/${eventId}`, eventData, config);
  return response.data;
};

const deleteEvent = async (eventId) => {
  const response = await axios.delete(`${API_URL}/events/${eventId}`, config);
  return response.data;
};

const eventService = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

export default eventService;