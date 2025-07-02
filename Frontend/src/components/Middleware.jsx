import { Navigate } from "react-router-dom";

const Middleware = ({ children, path }) => {
  const token = localStorage.getItem("token");

  if (!token && path!=='/login') {
    return <Navigate to="/login" />;
  }

  if (token && path === "/login") {
    return <Navigate to="/" />;
  }

  return <>{children}</>; 
};

export default Middleware;
