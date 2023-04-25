import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductType } from "../../types/Product";
import ProductServices from "../../services/ProductServices";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const SearchProduct = () => {
  const useQuery = new URLSearchParams(useLocation().search);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchTxt = useQuery.get("search");
    if (!searchTxt) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const { data }: { data: ProductType[] } = await ProductServices.getProductBySearch(searchTxt);
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-row flex-wrap mx-8 my-4 min-w-[54rem]">
      {productList.map((product, index) => (
        <div
          key={index}
          className="flex-none m-2 p-2 bg-gray-50 w-[17rem] shadow hover:cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            navigate(`/product/${product.product_id}`);
          }}
        >
          <p>{product.name}</p>
          <p>{capitalizeFirstLetter(product.category)}</p>
          <p>
            {import.meta.env.VITE_CURRENCY} {product.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchProduct;
