// import { Navigate } from 'react-router-dom';

//  const OpenRoutes = ({ children }) => {
//   const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('user'));
//   return getTokenFromLocalStorage?.token === undefined ? (
//     children
//   ) : (
//     <Navigate to="/admin" replace={true} />
//   );
// };
// export default OpenRoutes;
import { Navigate } from "react-router-dom";

const OpenRoutes = ({ children }) => {
  const token = localStorage.getItem("token"); // or use a global state to get the auth status
  return !token ? children : <Navigate to="/admin" />;
};

export default OpenRoutes;

// The component uses a conditional statement to determine what to render based on the presence of a token. If the token is undefined, it renders the children prop, which means the user is allowed to access the route.

// If the token is not undefined, it means the user is authenticated, and the component renders a Navigate component with the following props: