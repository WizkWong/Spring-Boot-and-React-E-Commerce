import { useEffect, useState } from "react";
import ProductServices from "../../services/ProductServices";
import { PaginationType, ProductType } from "../../types/Product";
import ProductSection from "../../components/ProductSection";

const RecommendProduct = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [page, setPage] = useState<PaginationType>({
    currentPage: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ProductServices.getProductRecommendation(
          page.currentPage
        );
        setProductList([...productList, ...data.productList]);
        setPage({ ...page, totalPages: data.totalPages });
      } catch (error: any) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [page.currentPage]);

  return (
    <ProductSection
      title={"Product based on your recent visited product category"}
      productList={productList}
      page={page}
      setPage={setPage}
    />
  );
};

export default RecommendProduct;
