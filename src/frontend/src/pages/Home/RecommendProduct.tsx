import { useEffect, useState } from "react";
import ProductServices from "../../services/ProductServices";
import { ProductType } from "../../types/Product";
import ProductBox from "../../components/ProductBox";

const RecommendProduct = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [page, setPage] = useState({
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
    <>
      {productList.length !== 0 ? (
        <div className="mx-8 my-4">
          <h1 className="text-3xl font-semibold my-3">
            Product based on your recent visited product category
          </h1>
          <div className="flex flex-row flex-wrap min-w-[54rem] gap-4">
            {productList.map((product, index) => (
              <ProductBox key={index} product={product} />
            ))}
          </div>
          {page.currentPage + 1 < page.totalPages ? (
            <div className="flex flex-row mt-4">
              <div className="flex-1 border-b-2 -translate-y-1/2"></div>
              <button
                className="flex-initial px-16 border-2 rounded-3xl"
                onClick={() => {
                  setPage((oldPage) => ({
                    ...oldPage,
                    currentPage: oldPage.currentPage++,
                  }));
                }}
              >
                Show More
              </button>
              <div className="flex-1 border-b-2 -translate-y-1/2"></div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RecommendProduct;
