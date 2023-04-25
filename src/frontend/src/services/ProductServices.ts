import axios from "axios";

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

  getProductBySearch(searchTxt: string) {
    return axios.get(`${import.meta.env.VITE_PRODUCT_API_BASE_URL}?search=${searchTxt}`);
  }

  getProductById(id: number) {
    return axios.get(`${import.meta.env.VITE_PRODUCT_API_BASE_URL}/${id}`);
  }
}

export default ProductServices.getInstance();
