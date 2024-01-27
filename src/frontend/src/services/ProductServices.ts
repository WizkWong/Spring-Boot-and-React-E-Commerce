import axios from "axios";
import { AxiosResponse } from "axios";
import { ProductType, ProductPaginationType } from "../types/Product";
import { Cookies } from "react-cookie";
import { CustomerProfile } from "../types/User";

class ProductServices {
  private static instance: ProductServices;

  private readonly cookies: Cookies;

  private constructor() {
    this.cookies = new Cookies;
  }

  // singleton method
  static getInstance(): ProductServices {
    if (!ProductServices.instance) {
      ProductServices.instance = new ProductServices();
    }
    return ProductServices.instance;
  }

  getProductBySearch(page: number, searchTxt: string): Promise<AxiosResponse<ProductPaginationType, any>> {
    return axios.get(`${import.meta.env.VITE_PRODUCT_API_BASE_URL}?page=${page}&search=${searchTxt}`);
  }

  getProductById(id: number): Promise<AxiosResponse<ProductType, any>> {
    const customer: CustomerProfile = this.cookies.get("userProfile");
    return axios.get(`${import.meta.env.VITE_PRODUCT_API_BASE_URL}/${id}${customer == null ? "" : `?customer-id=${customer.customer_id}`}`);
  }
}

export default ProductServices.getInstance();
