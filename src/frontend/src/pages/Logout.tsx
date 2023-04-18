import { useEffect } from "react";
import CustomerService from "../services/CustomerService";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (CustomerService.logout()) {
      navigate("/");
    }
  }, [])

  return (
    <></>
  )
}

export default Logout