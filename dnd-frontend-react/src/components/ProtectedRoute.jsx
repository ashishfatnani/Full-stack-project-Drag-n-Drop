import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children; // Render children if the token exists
  } else {
    return (
      <>
        <Navigate to="/login" />
      </>
    ); // Redirect to login page if no token
  }
};

export default ProtectedRoute;
