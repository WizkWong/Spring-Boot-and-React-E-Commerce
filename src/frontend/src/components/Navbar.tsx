import { useEffect, useState } from "react";
import searchImg from "../assets/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { hasAuthToken, hasProfileToken } from "../lib/checkCookies";
import { useCookies } from "react-cookie";
import CustomerService from "../services/CustomerService";
import setExpireDate from "../utils/setExpireDate";

const Navbar = () => {
  const nav_category: string[] = [
    "Sports",
    "Clothes",
    "Accessories",
    "Technology",
  ];

  const [cookies, setCookies, removeCookies] = useCookies();
  const [searchTxt, setSearctTxt] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearctTxt(value);
  };

  const clickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTxt);
  };

  const logout = (e: React.MouseEvent<HTMLElement>) => {
    CustomerService.logout();
    navigate("/");
  }

  useEffect(() => {
    if (hasAuthToken() && !hasProfileToken()) {
      // get user data, if error probably means authToken is expired, so navigate to login page
      const fetchData = async () => {
        try {
          const { data } = await CustomerService.getProfile();
          setCookies("userProfile", data, {
            expires: setExpireDate({ minute: 30 }),
          });
        } catch (error) {
          console.log(error);
          removeCookies("authToken");
          navigate("/login");
        }
      };
      fetchData();
    }
  }, [])

  return (
    <nav>
      <div className="flex items-center bg-gray-300 py-3 text-xl">
        <div className="flex-none mx-4">
          {import.meta.env.VITE_WEBSITE_TITLE}
        </div>
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
        <div className="flex-none flex items-center">
          {hasAuthToken() ? (
            <>
              <Link to="profile" className="mx-6">
                {cookies.userProfile ? cookies.userProfile.username : "user"}
              </Link>
              <button className="mx-6" onClick={logout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="login" className="mx-6">
                Sign In
              </Link>
              <Link to="signup" className="mx-6">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center bg-gray-100 py-1">
        {nav_category.map((element, index) => (
          <p
            key={index}
            className="px-8 hover:text-black hover:cursor-pointer text-gray-600 font-bold"
          >
            {element}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
