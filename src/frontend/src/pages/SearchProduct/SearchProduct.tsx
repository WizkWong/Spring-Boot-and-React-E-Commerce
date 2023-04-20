import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";
import ProductServices from "../../services/ProductServices";

const SearchProduct = () => {
  const useQuery = new URLSearchParams(useLocation().search);
  const [productList, setProductList] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchTxt = useQuery.get("search");
    if (!searchTxt) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const { data }: { data: Product[] } = await ProductServices.getProductBySearch(searchTxt);
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {productList.map((product, index) => (
        <div key={index}>
          <p>{product.product_id}</p>
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>{product.price}</p>
          <p>{product.created_datetime}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchProduct;
