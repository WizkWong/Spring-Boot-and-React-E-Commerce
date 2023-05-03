import axios from "axios";
import { AxiosResponse } from "axios";
import { ProductType } from "../types/Product";

class ProductServices {
  private static instance: ProductServices;

  private constructor() {}

  // singleton method
  static getInstance(): ProductServices {
    if (!ProductServices.instance) {
      ProductServices.instance = new ProductServices();
    }
    return ProductServices.instance;
  }

  getProductBySearch(searchTxt: string): Promise<AxiosResponse<ProductType[], any>> {
    return axios.get(`${import.meta.env.VITE_PRODUCT_API_BASE_URL}?search=${searchTxt}`);
  }

  getProductById(id: number): Promise<AxiosResponse<ProductType, any>> {
    return axios.get(`${import.meta.env.VITE_PRODUCT_API_BASE_URL}/${id}`);
  }
}

export default ProductServices.getInstance();
