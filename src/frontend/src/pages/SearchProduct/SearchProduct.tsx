import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductType } from "../../types/Product";
import ProductServices from "../../services/ProductServices";
import ProductBox from "../../components/ProductBox";

const SearchProduct = () => {
  const useQuery = new URLSearchParams(useLocation().search);
  const searchTxt = useQuery.get("search");
  const category = useQuery.get("category");
  const navigate = useNavigate();
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [page, setPage] = useState({
    currentPage: 0,
    totalPages: 0,
  });

  useEffect(() => {
    if (!searchTxt) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const { data } = await ProductServices.getProductBySearch(
          page.currentPage,
          searchTxt,
          category
        );
        setProductList(data.productList);
        setPage({ ...page, totalPages: data.totalPages });
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchTxt, category, page.currentPage]);

  const pageBtnFunction = (p: number) => {
    setPage({ ...page, currentPage: p });
  };

  const pageBtn = [];
  for (let i = 0; i < page.totalPages; i++) {
    pageBtn.push(
      <div key={i}>
        {i === page.currentPage ? (
          <button className="p-2 mx-1 border-2 bg-blue-300">{i + 1}</button>
        ) : (
          <button
            className="p-2 mx-1 border-2"
            onClick={() => {
              pageBtnFunction(i);
            }}
          >
            {i + 1}
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row flex-wrap mx-8 my-4 min-w-[54rem] gap-4">
        {productList.map((product, index) => (
          <ProductBox
            key={index}
            product={product}
          />
        ))}
      </div>
      {productList.length !== 0 && (
        <div className="flex flex-row mb-5 items-center justify-center">{pageBtn}</div>
      )}
    </>
  );
};

export default SearchProduct;
