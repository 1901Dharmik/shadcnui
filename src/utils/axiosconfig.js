// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;
//  export const config = {
//   headers: {
//     Authorization: `Bearer ${
//       getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
//     }`,
//     Accept: "application/json",
//   },
// };
// export default config;
// Helper function to safely get the token
const getTokenFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("token");
    return user ? user : null;
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
    return null;
  }
};

// Export the config with the token
export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage() || ""}`,
    Accept: "application/json",
  },
};
