import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../../types/Product";
import { useEffect, useState } from "react";
import ProductServices from "../../services/ProductServices";
import { CustomerCart } from "../../types/User";
import CustomerService from "../../services/CustomerService";
import ProductDetail from "./ProductDetail";
import DialogBox from "../../components/DialogBox";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState(false);
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
      setError(false);
    } catch (error) {
      setError(true);
    }
    setIsHidden(false);
  };

  return (
    <div className="mx-16 my-4">
      {product ? (
        <>
          <ProductDetail product={product} addToCart={addToCart} />
          <DialogBox
            title={error ? "Cart Error !" : "Successfully add to cart"}
            content={
              error
                ? `'${product.name}' is added failed into cart, please try again.`
                : `'${product.name}' is added into cart.`
            }
            hidden={isHidden}
            onClose={() => {
              setIsHidden(true);
            }}
          />
        </>
      ) : (
        <>{loading ? <p>Loading ...</p> : <p>Product Not Found</p>}</>
      )}
    </div>
  );
};

export default Product;
