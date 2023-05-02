import { ProductType } from "../../types/Product";
import { CustomerCart } from "../../types/User";
import defaultImg from "../../assets/default.jpg";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { hasAuthToken, hasProfileToken } from "../../lib/checkCookies";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product, addToCart } : { product: ProductType, addToCart: (cartItem: CustomerCart) => Promise<void> }) => {
  const navigate = useNavigate();

  const addToCartBtn = (e: React.MouseEvent<HTMLElement>) => {
    // check authentication
    if (!hasAuthToken() || !hasProfileToken()) {
      navigate("/login");
      return;
    }
    if (product === undefined) {
      console.log("Product is undefined");
      return;
    }
    const cartItem: CustomerCart = {
      product: product,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <div className="flex flex-row">
      <div className="flex-none flex mx-8 w-[32rem] h-[36rem] border-2 shadow items-center justify-center">
        <img
          className="max-w-full max-h-full"
          src={
            product.image
              ? `data:image/jpeg;base64,${product.image}`
              : defaultImg
          }
        ></img>
      </div>
      <div className="flex-1 flex flex-col items-start">
        <p className="text-3xl mt-2 mb-6 font-semibold">{product.name}</p>
        <p className="text-2xl mb-6">
          Category: {product.category ? capitalizeFirstLetter(product.category) : "-"}
        </p>
        <p className="text-2xl mb-6">
          {import.meta.env.VITE_CURRENCY} {product.price}
        </p>
        <button
          onClick={addToCartBtn}
          className="text-white font-semibold bg-orange-600 px-3 py-2 hover:cursor-pointer"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
