import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import searchImg from "../../assets/search.svg";

const SearchBar = () => {
  const useQuery = new URLSearchParams(useLocation().search);
  const searchParam = useQuery.get("search");

  const [searchTxt, setSearctTxt] = useState(searchParam ? searchParam : "");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearctTxt(value);
  };

  const clickSearch = () => {
    navigate(`/product?search=${searchTxt}`);
  };

  return (
    <form onSubmit={clickSearch} className="flex-1 flex item-center">
      <input
        className="grow pl-2 py-2"
        type="test"
        name="search"
        value={searchTxt}
        onChange={handleChange}
        placeholder="Search ..."
      ></input>
      <button type="submit" className="flex-none">
        <img
          src={searchImg}
          alt="search"
          className="bg-yellow-600 min-h-full px-3"
        ></img>
      </button>
    </form>
  );
};

export default SearchBar;
