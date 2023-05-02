import { Link } from "react-router-dom";
import cartImg from "../../assets/cart.png";
import { hasAuthToken } from "../../lib/checkCookies";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";

const MainNav = () => {
  return (
    <div className="flex items-center bg-gray-300 py-3 text-xl">
      <Link to="" className="flex-none mx-4">
        {import.meta.env.VITE_WEBSITE_TITLE}
      </Link>
      <SearchBar />
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
