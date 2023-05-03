import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../../types/Product";
import { useEffect, useState } from "react";
import ProductServices from "../../services/ProductServices";
import { CustomerCart } from "../../types/User";
import CustomerService from "../../services/CustomerService";
import PopUpNotification from "./PopUpNotification";
import ProductDetail from "./ProductDetail";

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
        const { data } = await ProductServices.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const addToCart = async (cartItem: CustomerCart) => {
    try {
      await CustomerService.addToCart(cartItem);
    } catch (error) {
      setError(true);
    }
    setIsHidden(false);
  };

  // close pop up notification by clicking anywhere
  document.addEventListener("mousedown", () => {
    setIsHidden(true);
    setError(false);
  });

  return (
    <div className="mx-16 my-4">
      {product ? (
        <>
          <ProductDetail product={product} addToCart={addToCart} />
          <PopUpNotification isHidden={isHidden} error={error} />
        </>
      ) : (
        <>{loading ? <p>Loading ...</p> : <p>Product Not Found</p>}</>
      )}
    </div>
  );
};

export default Product;
