// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // Create a custom hook to use navigate
// const useAxiosNavigate = () => {
//     const navigate = useNavigate();
//     return navigate;
//   };

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000/api/",
// });

// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Token expired or invalid
//     //   alert("you Dont Have Permission");
//     //   localStorage.removeItem("token"); // Remove token
//       window.location.href = "/admin/aceess-denied"; // Redirect to login

//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status;

      // Remove token and redirect to login on unauthorized or forbidden errors
      if (status === 401 || status === 403) {
        // localStorage.removeItem("token"); // Remove token from storage
        window.location.href = "/admin/aceess-denied"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
