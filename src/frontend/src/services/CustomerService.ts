import axios from "axios";
import { AxiosResponse } from "axios";
import { Customer, CustomerAuth } from "../types/User";
import { setAuthorizationHeader } from "../lib/axiousHeader";
import { useNavigate } from "react-router-dom";
import { hasAuthToken } from "../lib/checkCookies";
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

  login(customerAuth: CustomerAuth): Promise<AxiosResponse<any, any>> {
    return axios.post(
      `${import.meta.env.VITE_AUTH_API_BASE_URL}/authenticate`,
      customerAuth
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

  // get current user of Customer profile
  getProfile(): Promise<AxiosResponse<any, any>> {
    return axios.get(
      `${import.meta.env.VITE_AUTH_API_BASE_URL}/profile`,
      setAuthorizationHeader()
    );
  }
}

export default CustomerService.getInstance();
