// import { Navigate } from 'react-router-dom';

//  const PrivateRoutes = ({ children }) => {
//   const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('user'));
//   return getTokenFromLocalStorage?.token !== undefined ? (
//     children
//   ) : (
//     <Navigate to="/login" replace={true} />
//   );
// };
// export default PrivateRoutes;
// lst edited
// import { Navigate, Link } from 'react-router-dom';
// import { useState } from 'react';

// const getStoredToken = () => {
//   const storedUser  = localStorage.getItem('user');
//   return storedUser  ? JSON.parse(storedUser ).token : null;
// };

// const PrivateRoutes = ({ children }) => {
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const token = getStoredToken();
//   console.log(token);
//   if (!token) {
//     return (
//       <>
//         {/* {showLoginPopup && (
//           <div className="popup">
//             <p>You have to first login to access this routes</p>
//             <button onClick={() => setShowLoginPopup(false)}>Close</button>
//           </div>
//         )}
//         <button onClick={() => setShowLoginPopup(true)}>Login</button> */}
//         <div className="">
//         You have to first login to access this routes
//           <Link to="/"> Login</Link>
//         </div>
//         {/* <Navigate to="/" replace={true} /> */}
//         <div className="alert">
//           <span className="alert-icon" role="img" aria-label="warning">

//           </span>
//           <span className="alert-message">
//             You have to first login to access this routes
//           </span>
//         </div>
//       </>
//     );
//   }

//   return children;
// };
// export default PrivateRoutes;

// new
// import React from "react";
// import { Navigate, Outlet, Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export default function PrivateRoutes({ redirectPath = "/" }) {

//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Link to={redirectPath} />;
//   }

//   try {
//     const decodedToken = jwtDecode(token);
//     const isTokenExpired = decodedToken.exp * 1000 < Date.now();
//     if (isTokenExpired) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       return <Link to={redirectPath} />;
//     }
//   } catch {
//     return <Link to={redirectPath} />;
//   }

//   return <Outlet />;
// };


// src/components/PrivateRoute.jsx
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const location = useLocation();

//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRoute;


// components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import AccessDenied from '../pages/AccessDenied';

// const ProtectedRoute = ({ children, requiredResource, requiredActions = [] }) => {
//   const location = useLocation();
  
//   // Get user data from localStorage
//   const getUserData = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       return userStr ? JSON.parse(userStr) : null;
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       return null;
//     }
//   };

//   // Check if user has required permissions
//   const hasRequiredPermissions = () => {
//     const userData = getUserData();
    
//     if (!userData?.role?.permissions) return false;
    
//     // Find the resource in user's permissions
//     const resourcePermission = userData.role.permissions.find(
//       p => p.resource === requiredResource
//     );
    
//     if (!resourcePermission) return false;
    
//     // If no specific actions are required, just having the resource is enough
//     if (!requiredActions.length) return true;
    
//     // Check if user has all required actions for this resource
//     return requiredActions.every(action => 
//       resourcePermission.actions.includes(action)
//     );
//   };

//   // If not authenticated, redirect to login
//   if (!getUserData()) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }
  
//   // If authenticated but doesn't have required permissions, show AccessDenied
//   if (requiredResource && !hasRequiredPermissions()) {
//     // return <Navigate to="/access-denied" state={{ from: location }} replace />;
//     return <AccessDenied />;
//   }

//   // If authenticated and has permissions, render the protected content
//   return children;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AccessDenied from '../pages/AccessDenied';
import { refreshUserData } from '../features/auth/authService'; // Adjust import path as needed

const ProtectedRoute = ({ children, requiredResource, requiredActions = [] }) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Attempt to refresh user data
        const freshUserData = await refreshUserData();
        setUserData(freshUserData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Check if we have a token before attempting to refresh
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Check if user has required permissions
  const hasRequiredPermissions = () => {
    if (!userData?.role?.permissions) return false;
    
    // Find the resource in user's permissions
    const resourcePermission = userData.role.permissions.find(
      p => p.resource === requiredResource
    );
    
    if (!resourcePermission) return false;
    
    // If no specific actions are required, just having the resource is enough
    if (!requiredActions.length) return true;
    
    // Check if user has all required actions for this resource
    return requiredActions.every(action => 
      resourcePermission.actions.includes(action)
    );
  };

  // Show loading state if still checking authentication
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your preferred loading component
  }

  // If not authenticated, redirect to login
  if (!userData) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // If authenticated but doesn't have required permissions, show AccessDenied
  if (requiredResource && !hasRequiredPermissions()) {
    return <AccessDenied />;
  }

  // If authenticated and has permissions, render the protected content
  return children;
};

export default ProtectedRoute;