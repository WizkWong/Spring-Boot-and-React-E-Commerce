import axios from "axios";
import { AxiosResponse } from "axios";
import { Customer } from "../types/User";

class CustomerService {
  static instance: CustomerService;

  private constructor() {}

  // singleton method
  static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }

  // create new customer
  createCustomer(customer: Customer): Promise<AxiosResponse<any, any>> {
    return axios.post(import.meta.env.VITE_CUSTOMER_API_BASE_URL, customer)
  }

}

export default CustomerService.getInstance()