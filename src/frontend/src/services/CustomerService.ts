import axios from "axios";
import { AxiosResponse } from "axios";
import { Customer, CustomerAuth, CustomerCart, CustomerProfile } from "../types/User";
import { setAuthorizationHeader } from "../lib/axiousHeader";
import { Cookies } from "react-cookie";

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

  logout(): boolean {
    const cookies = new Cookies();
    cookies.remove("authToken");
    cookies.remove("userProfile");
    return true;
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
      `${import.meta.env.VITE_API_BASE_URL}/profile`,
      setAuthorizationHeader()
    );
  }

  changePassword(oldPassword: string, newPassword: string): Promise<AxiosResponse<any, any>> {
    return axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/change-password`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      setAuthorizationHeader()
    );
  }

  addToCart(cartItem: CustomerCart): Promise<AxiosResponse<any, any>> {
    const cookies = new Cookies();
    const customer: CustomerProfile = cookies.get("userProfile")
    return axios.put(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/${customer.customer_id}/cart/add`,
      cartItem,
      setAuthorizationHeader()
    )
  }
}

export default CustomerService.getInstance();
