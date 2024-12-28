// src/redux/rolesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const response = await axios.get(`${base_url}roles`,config);
  return response.data;
});

export const createRole = createAsyncThunk('roles/createRole', async (roleData) => {
  const response = await axios.post(`${base_url}roles`, roleData, config);
  return response.data;
});

export const updateRole = createAsyncThunk('roles/updateRole', async ({ id, roleData }) => {
  const response = await axios.put(`${base_url}roles/${id}`, roleData, config);
  return response.data;
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (id) => {
  await axios.delete(`${base_url}roles/${id}`, config);
  return id;
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(role => role._id === action.payload._id);
        state.roles[index] = action.payload;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(role => role._id !== action.payload);
      });
  },
});

export default rolesSlice.reducer;
