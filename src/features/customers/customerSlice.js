// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import customerService from './customerService';

// export const getUsers = createAsyncThunk(
//   'customer/get-customer',
//   async (thunkAPI) => {
//     try {
//       return await customerService.getUsers();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// const initialState = {
//   customers: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
//   message: '',
// };

// export const customerSlice = createSlice({
//   name: 'customers',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUsers.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getUsers.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.customers = action.payload;
//       })
//       .addCase(getUsers.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.error;
//       });
//   },
// });

// export default customerSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from './customerService';

// Async thunk to fetch users with search, sorting, and pagination params
export const getUsers = createAsyncThunk(
  'customer/get-customer',
  async (params, thunkAPI) => {
    try {
      return await customerService.getUsers(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  customers: [],
  totalUsers: 0,
  totalPages: 1,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default customerSlice.reducer;
