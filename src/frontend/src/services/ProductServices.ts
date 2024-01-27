import axios from "axios";
import { AxiosResponse } from "axios";
import { ProductType, ProductPaginationType } from "../types/Product";
import { Cookies } from "react-cookie";
import { hasAuthToken } from "../lib/checkCookies";

class ProductServices {
  private static instance: ProductServices;

  private readonly cookies: Cookies;

  private constructor() {
    this.cookies = new Cookies();
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
    let param: string = "";
    if (hasAuthToken()) {
      const customerId: number = this.cookies.get("authToken").userId;
      param = `?customer-id=${customerId}`;
    }
    return axios.get(`${import.meta.env.VITE_PRODUCT_API_BASE_URL}/${id}${param}`);
  }
}

export default ProductServices.getInstance();
