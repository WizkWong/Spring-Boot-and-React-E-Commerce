import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductType } from "../../types/Product";
import ProductServices from "../../services/ProductServices";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import defaultImg from "../../assets/default.jpg";

const SearchProduct = () => {
  const useQuery = new URLSearchParams(useLocation().search);
  const searchTxt = useQuery.get("search");
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
          searchTxt
        );
        setProductList(data.productList);
        setPage({ ...page, totalPages: data.totalPages });
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchTxt, page.currentPage]);

  const pageBtnFunction = (p: number) => {
    setPage({ ...page, currentPage: p });
    console.log(page.currentPage);
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
      <div className="flex flex-row flex-wrap mx-8 my-4 min-w-[54rem]">
        {productList.map((product, index) => (
          <div
            key={index}
            className="flex-none m-2 p-2 bg-gray-50 w-[17rem] border-2 shadow hover:cursor-pointer"
            onClick={() => {
              navigate(`/product/${product.product_id}`);
            }}
          >
            <div className="flex w-64 h-64 items-center justify-center">
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

            <p>{product.name}</p>
            <p>{capitalizeFirstLetter(product.category)}</p>
            <p>
              {import.meta.env.VITE_CURRENCY} {product.price}
            </p>
          </div>
        ))}
      </div>
      {productList.length !== 0 && (
        <div className="flex flex-row mb-5 items-center justify-center">{pageBtn}</div>
      )}
    </>
  );
};

export default SearchProduct;
