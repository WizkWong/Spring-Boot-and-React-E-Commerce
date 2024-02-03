import { useEffect, useState } from "react";
import ProductServices from "../../services/ProductServices";
import { PaginationType, ProductType } from "../../types/Product";
import ProductSection from "../../components/ProductSection";

const LatestProduct = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [page, setPage] = useState<PaginationType>({
    currentPage: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ProductServices.getProductLatest(
          page.currentPage
        );
        setProductList([...productList, ...data.productList]);
        setPage({ ...page, totalPages: data.totalPages });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page.currentPage]);

  return (
    <ProductSection
      title={"Latest Product"}
      productList={productList}
      page={page}
      setPage={setPage}
    />
  );
};

export default LatestProduct;
