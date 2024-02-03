import React from "react";
import ProductBox from "./ProductBox";
import { PaginationType, ProductType } from "../types/Product";

const ProductSection = ({
  title,
  productList,
  page,
  setPage,
}: {
  title: string;
  productList: ProductType[];
  page: PaginationType;
  setPage: React.Dispatch<React.SetStateAction<PaginationType>>;
}) => {
  return (
    <>
      {productList.length !== 0 ? (
        <div className="mx-8 my-4">
          <h1 className="text-3xl font-semibold my-3">{title}</h1>
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

export default ProductSection;
