import axios from "axios";
import { AxiosResponse } from "axios";
import { Customer, CustomerAuth } from "../types/User";

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
    return axios.post(`${import.meta.env.VITE_AUTH_API_BASE_URL}/authenticate`, customer)
  }

  // create new customer
  createCustomer(customer: Customer): Promise<AxiosResponse<any, any>> {
    return axios.post(`${import.meta.env.VITE_AUTH_API_BASE_URL}/register`, customer)
  }

}

export default CustomerService.getInstance()