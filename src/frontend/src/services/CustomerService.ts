import axios from "axios";
import { AxiosResponse } from "axios";
import { Customer, CustomerAuth } from "../types/User";
import { setAuthorizationHeader } from "../lib/axiousHeader";
import { useNavigate } from "react-router-dom";
import { hasAuthToken } from "../lib/axiousHeader";
import { useCookies } from "react-cookie";

class CustomerService {
  private static instance: CustomerService;

  private constructor() {}

  // singleton method
  static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }

  // login
  login(customer: CustomerAuth): Promise<AxiosResponse<any, any>> {
    return axios.post(
      `${import.meta.env.VITE_AUTH_API_BASE_URL}/authenticate`,
      customer
    );
  }

  logout(): void {
    const [cookie, setCookie, removeCookie] = useCookies();
    removeCookie("authToken");
  }

  // create new customer
  register(customer: Customer): Promise<AxiosResponse<any, any>> {
    return axios.post(
      `${import.meta.env.VITE_AUTH_API_BASE_URL}/register`,
      customer
    );
  }

  getProfile() {
    const navigate = useNavigate();
    if (!hasAuthToken()) {
      navigate("/login");
    }
    axios.get(
      `${import.meta.env.VITE_AUTH_API_BASE_URL}/profile`,
      setAuthorizationHeader()
    );
  }
}

export default CustomerService.getInstance();
