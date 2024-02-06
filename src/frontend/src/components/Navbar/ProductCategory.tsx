import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../App";
import ProductServices from "../../services/ProductServices";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const ProductCategory = () => {
  const [searchTxt] = useContext(SearchContext);
  const [productCategory, setProductCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ProductServices.getAllCategory();
        setProductCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center bg-gray-100 py-1">
      {productCategory.map((element, index) => (
        <Link
          to={`product?search=${searchTxt !== "" ? searchTxt : " "}&category=${element.toLowerCase()}`}
          key={index}
          className="px-8 hover:text-black hover:cursor-pointer text-gray-600 font-bold"
        >
          {capitalizeFirstLetter(element)}
        </Link>
      ))}
    </div>
  );
};

export default ProductCategory;
