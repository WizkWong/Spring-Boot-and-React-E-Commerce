export interface ProductType {
  product_id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  created_datetime?: string;
}

export interface ProductPaginationType {
  productList: ProductType[];
  totalPages: number;
}
