import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
import axiosInstance from "../../utils/axiosInstance";
export const refreshUserData = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    // Fetch updated user data
    const response = await axios.get(`${base_url}user/getuser/refreshuser`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data) {
      // Update localStorage with fresh user data
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.error('Error refreshing user data:', error);
    // Optional: Handle logout or token refresh
    alert(error.message)
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    // window.location.href = '/'; // Redirect to login
    return null;
  }
};
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    // localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// const login = async (email, password) => {
//   const response = await axios.post(`${ base_url}user/admin-login`, { email, password });
//   // if(response.data){
//   //   localStorage.setItem("user", JSON.stringify(response.data));
//   // }
//   return response.data;
// };

// const verifyOTP = async (email, otp) => {
//   const response = await axios.post(`${ base_url}user/verify-otp`, { email, otp });
//   if(response.data){
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }
//   return response.data;
// };
const updateUser = async (data) => {
  const response = await axios.put(
    `${base_url}user/edit-user`,
    data.data,
    data.config2
  );
  if (response.data) {
    return response.data;
  }
};

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getaorder/${id}`, config);
  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateorder/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

const getMothlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    data
  );

  return response.data;
};

const getYearlyStats = async (data) => {
  const response = await axios.get(`${base_url}user/getyearlyorders`, data);
  return response.data;
};

const getOrdersByDate = async (startDate, endDate, orderStatus,firstname, lastname,page,limit) => {
  const response = await axios.get(`${base_url}user/getordersByDate`, {
    params: { startDate, endDate,orderStatus,firstname, lastname,page,limit},
    ...config
  });
  return response.data;
};

const getOrders = async (data) => {
  const response = await axios.get(`${base_url}user/getallorders`, {
    params: data,
    ...config
  });
  return response.data;
};
export async function fetchUserData(userId) {
  try {
    const response = await axios.get(`${base_url}user/${userId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function blockUser(userId) {
  try {
    const response = await axios.put(`${base_url}user/block-user/${userId}`,{},config);
    return response.data;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
}

export async function unblockUser(userId) {
  try {
    const response = await axios.put(`${base_url}user/unblock-user/${userId}`, {},config);
    return response.data;
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
}
// export const getOrdersByDateRange = createAsyncThunk(
//   'orders/getOrdersByDateRange',
//   async ({ startDate, endDate }, thunkAPI) => {
//     try {
//       const response = await axios.get(`/api/orders/range`, {
//         params: { startDate, endDate },
//         ...config
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

const authService = {
  login,
  // verifyOTP,
  getOrders,
  getOrder,
  getMothlyOrders,
  getYearlyStats,
  updateOrder,
  getOrdersByDate,
  updateUser,
  // refreshUserData,
};

export default authService;
