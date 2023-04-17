import { hasAuthToken, hasProfileToken } from "../lib/checkCookies";
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import CustomerService from "../services/CustomerService";
import { Cookies } from "react-cookie";
import setExpireDate from "../utils/setExpireDate";

const ProtectedRoute = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  
  if (!hasAuthToken()) {
    return <Navigate to="/login" />;
  }

  if (!hasProfileToken()) {
    // get user data, if error probably means authToken is expired, so navigate to login page
    const fetchData = async () => {
      try {
        const response = await CustomerService.getProfile();
        cookie.set("userProfile", response.data, {
          expires: setExpireDate({ minute: 30 }),
        });
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    fetchData();
  }
  return <Outlet />;
};

export default ProtectedRoute;
