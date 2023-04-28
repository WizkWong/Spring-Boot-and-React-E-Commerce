import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../../types/Product";
import { useEffect, useState } from "react";
import ProductServices from "../../services/ProductServices";
import defaultImg from "../../assets/default.jpg";
import { hasAuthToken, hasProfileToken } from "../../lib/checkCookies";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { CustomerCart } from "../../types/User";
import CustomerService from "../../services/CustomerService";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const productId = Number(params.id);
    if (isNaN(productId)) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const { data }: { data: ProductType } = await ProductServices.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();

    // close pop up notification by clicking anywhere
    document.addEventListener("mousedown", () => {
      setIsHidden(true);
      setError(false);
    });
  }, []);

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
    const addToCart = async () => {
      try {
        await CustomerService.addToCart(cartItem);
      } catch (error) {
        setError(true);
      }
      setIsHidden(false);
    };
    addToCart();
  };

  return (
    <div className="mx-16 my-4">
      {product ? (
        <>
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
                Category:{" "}
                {product.category
                  ? capitalizeFirstLetter(product.category)
                  : "-"}
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
          <div className="fixed w-full h-full top-0 left-0" hidden={isHidden}>
            <p className="my-96 text-4xl font-semibold text-center">
              {error ? "Add to cart has failed, please try again" : "Successfully add to cart"}
            </p>
          </div>
        </>
      ) : (
        <>{loading ? <p>Loading ...</p> : <p>Product Not Found</p>}</>
      )}
    </div>
  );
};

export default Product;
