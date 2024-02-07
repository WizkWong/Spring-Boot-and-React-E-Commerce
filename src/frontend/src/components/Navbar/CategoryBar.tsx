import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../App";
import ProductServices from "../../services/ProductServices";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const CategoryBar = () => {
  const [searchTxt] = useContext(SearchContext);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const categoryBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ProductServices.getAllCategory();
        setCategoryList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleNav = (direction: string) => {
    if (!categoryBarRef.current) return;
    
    const scrollAmount = 500;
    if (direction === "left") {
      categoryBarRef.current.scrollLeft -= scrollAmount;
    } else {
      categoryBarRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <>
      {categoryList.length !== 0 && (
        <div className="relative">
          <button
            onClick={() => handleNav("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 py-1 border-r-2 bg-gray-100 hover:bg-gray-200"
          >
            ←
          </button>
          <div
            className="flex items-center bg-gray-100 ml-3 py-1 scroll-smooth overflow-hidden"
            ref={categoryBarRef}
          >
            {categoryList.map((element, index) => (
              <Link
                to={`product?search=${searchTxt !== "" ? searchTxt : " "}&category=${element.toLowerCase()}`}
                key={index}
                className="inline-block mx-7 hover:text-black hover:cursor-pointer text-gray-600 font-bold"
              >
                {capitalizeFirstLetter(element)}
              </Link>
            ))}
          </div>
          <button
            onClick={() => handleNav("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-1 border-l-2 bg-gray-100 hover:bg-gray-200"
          >
            →
          </button>
        </div>
      )}
    </>
  );
};

export default CategoryBar;
