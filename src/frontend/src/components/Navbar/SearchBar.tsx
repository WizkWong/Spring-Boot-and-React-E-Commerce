import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import searchImg from "../../assets/search.svg";
import { SearchContext } from "../../App";

const SearchBar = () => {
  const [searchTxt, setSearctTxt] = useContext(SearchContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearctTxt(value);
  };

  const clickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/product?search=${searchTxt}`);
  };

  return (
    <form onSubmit={clickSearch} className="flex-1 flex item-center">
      <input
        className="grow pl-2 py-2"
        type="text"
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
