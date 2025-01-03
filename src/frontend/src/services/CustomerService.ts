import axios, { AxiosResponse } from "axios";
import { Customer, CustomerAuth, CustomerCart, CustomerOrder, CustomerOrderItem, CustomerProfile } from "../types/User";
import { setAuthorizationHeader } from "../lib/axiousHeader";
import { Cookies } from "react-cookie";
import UserService from "./UserService";

class CustomerService extends UserService {
  private static instance: CustomerService;

  private readonly cookies: Cookies;

  private constructor() {
    super();
    this.cookies = new Cookies();
  }

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
    this.cookies.remove("authToken");
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
  getProfile(): Promise<AxiosResponse<CustomerProfile, any>> {
    return axios.get(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/profile`,
      setAuthorizationHeader()
    );
  }

  // change current user of Customer profile
  updateProfile(customerProfile: CustomerProfile): Promise<AxiosResponse<any, any>> {
    return axios.put(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/update-profile`,
      customerProfile,
      setAuthorizationHeader()
    );
  }

  getCart(): Promise<AxiosResponse<CustomerCart[], any>> {
    const customerId: number = this.cookies.get("authToken").userId;
    return axios.get(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/${customerId}/cart`,
      setAuthorizationHeader()
    );
  }

  addToCart(cartItem: CustomerCart): Promise<AxiosResponse<any, any>> {
    const customerId: number = this.cookies.get("authToken").userId;
    return axios.put(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/${customerId}/cart/add`,
      cartItem,
      setAuthorizationHeader()
    );
  }

  updateCart(cartList: CustomerCart[]): Promise<AxiosResponse<any, any>> {
    const customerId: number = this.cookies.get("authToken").userId;
    return axios.put(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/${customerId}/cart`,
      cartList,
      setAuthorizationHeader()
    );
  }

  deleteCartItem(cartList: CustomerCart[]): Promise<AxiosResponse<any, any>> {
    const customerId: number = this.cookies.get("authToken").userId;
    const config = {
      ...setAuthorizationHeader(),
      data: cartList,
    };
    return axios.delete(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/${customerId}/cart`,
      config
    );
  }

  placeOrder(): Promise<AxiosResponse<any, any>> {
    const customerId: number = this.cookies.get("authToken").userId;
    return axios.post(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/${customerId}/order`,
      {},
      setAuthorizationHeader()
    );
  }

  getOrders(): Promise<AxiosResponse<CustomerOrder[], any>> {
    const customerId: number = this.cookies.get("authToken").userId;
    return axios.get(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/${customerId}/order`,
      setAuthorizationHeader()
    );
  }

  getOrderItems(orderId: number): Promise<AxiosResponse<CustomerOrderItem[], any>> {
    const customerId: number = this.cookies.get("authToken").userId;
    return axios.get(
      `${import.meta.env.VITE_CUSTOMER_API_BASE_URL}/${customerId}/order/${orderId}/items`,
      setAuthorizationHeader()
    );
  }
}

export default CustomerService.getInstance();
