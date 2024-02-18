export interface ProductType {
  id: number;
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

export interface PaginationType {
  currentPage: number,
  totalPages: number,
}