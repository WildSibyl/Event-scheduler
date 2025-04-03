import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
