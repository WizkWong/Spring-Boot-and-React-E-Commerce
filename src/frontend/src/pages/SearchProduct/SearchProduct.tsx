import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductType } from "../../types/Product";
import ProductServices from "../../services/ProductServices";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import defaultImg from "../../assets/default.jpg";

const SearchProduct = () => {
  const useQuery = new URLSearchParams(useLocation().search);
  const searchTxt = useQuery.get("search");
  const [productList, setProductList] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTxt) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const { data } = await ProductServices.getProductBySearch(searchTxt);
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchTxt]);

  return (
    <div className="flex flex-row flex-wrap mx-8 my-4 min-w-[54rem]">
      {productList.map((product, index) => (
        <div
          key={index}
          className="flex-none m-2 p-2 bg-gray-50 w-[17rem] border-2 shadow hover:cursor-pointer"
          onClick={() => {
            navigate(`/product/${product.product_id}`);
          }}
        >
          <div className="flex w-64 h-64 items-center justify-center">
            <img
              className="max-w-full max-h-full"
              src={
                product.image
                  ? `data:image/jpeg;base64,${product.image}`
                  : defaultImg
              }
              alt="no image"
            ></img>
          </div>

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
