import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../../types/Product";
import { useEffect, useState } from "react";
import ProductServices from "../../services/ProductServices";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-8 my-4">
      {loading ? (
        <>
          <p>{product?.product_id}</p>
          <p>{product?.name}</p>
          <p>{product?.category}</p>
          <p>{import.meta.env.VITE_CURRENCY} {product?.price}</p>
          <p>{product?.created_datetime}</p>
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default Product;
