import { Link, useNavigate } from "react-router-dom";
import searchImg from "../../assets/search.svg";
import { hasAuthToken } from "../../lib/checkCookies";
import { useState } from "react";
import Dropdown from "./Dropdown";

const MainNav = () => {
  const [searchTxt, setSearctTxt] = useState("");
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
      <div className="flex-none mx-4">{import.meta.env.VITE_WEBSITE_TITLE}</div>
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
          <Dropdown />
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
