import {jwtDecode} from 'jwt-decode';

// Function to check if the token is expired
const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token); // Extract expiration time
    return Date.now() >= exp * 1000; // Check if token is expired
};

// Function to check the token and redirect if expired
export const checkTokenAndRedirect = () => {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (isTokenExpired(token)) {
        localStorage.removeItem('token'); // Clear token
        window.location.href = '/login'; // Redirect to login
    }
};

// export default checkTokenAndRedirect ;
