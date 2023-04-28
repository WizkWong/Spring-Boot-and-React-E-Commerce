import { Link, useNavigate, useLocation } from "react-router-dom";
import searchImg from "../../assets/search.svg";
import cartImg from "../../assets/cart.png"
import { hasAuthToken } from "../../lib/checkCookies";
import { useState } from "react";
import Dropdown from "./Dropdown";

const MainNav = () => {
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
    <div className="flex items-center bg-gray-300 py-3 text-xl">
      <Link to="" className="flex-none mx-4">{import.meta.env.VITE_WEBSITE_TITLE}</Link>
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
      <div className="flex-none flex items-center mx-3">
        {hasAuthToken() ? (
          <>
            <Link to="cart" className="px-3 h-11 rounded-lg border-2 border-transparent hover:border-gray-400">
              <img className="max-w-full max-h-full" src={cartImg}></img>
            </Link>
            <Dropdown />
          </>
        ) : (
          <>
            <Link to="login" className="mx-5">
              Sign In
            </Link>
            <Link to="signup" className="mx-5">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MainNav;
