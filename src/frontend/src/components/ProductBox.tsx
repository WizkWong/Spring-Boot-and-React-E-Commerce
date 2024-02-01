import { ProductType } from "../types/Product";
import { useNavigate } from "react-router-dom";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import defaultImg from "../assets/default.jpg";

const ProductBox = ({ product } : { product: ProductType }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-50 w-[14rem] border-2 shadow hover:cursor-pointer"
      onClick={() => {
        navigate(`/product/${product.product_id}`);
      }}  
    >
      <div className="flex mx-auto w-[13.5rem] h-[13.5rem] items-center justify-center">
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
      <p className="text-sm p-2">
        {product.name} <br/>
        {capitalizeFirstLetter(product.category)} <br/>
        {import.meta.env.VITE_CURRENCY} {product.price} <br/>
      </p>
    </div>
  );
};

export default ProductBox;
