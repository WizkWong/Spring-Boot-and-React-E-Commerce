import { hasAuthToken } from "../lib/checkCookies";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  if (!hasAuthToken()) {
    return <Navigate to="/login" />;
  }

  return <Outlet />
};

export default ProtectedRoute;
