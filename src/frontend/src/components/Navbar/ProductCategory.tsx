import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../App";

const ProductCategory = () => {
  const [searchTxt] = useContext(SearchContext);

  const productCategory: string[] = [
    "Sports",
    "Clothes",
    "Accessories",
    "Technology",
  ];

  return (
    <div className="flex items-center bg-gray-100 py-1">
      {productCategory.map((element, index) => (
        <Link
          to={`product?search=${searchTxt !== "" ? searchTxt : " "}&category=${element}`}
          key={index}
          className="px-8 hover:text-black hover:cursor-pointer text-gray-600 font-bold"
        >
          {element}
        </Link>
      ))}
    </div>
  );
};

export default ProductCategory;
