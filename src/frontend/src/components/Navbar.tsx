import { useState } from "react";
import searchImg from "../assets/search.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const nav_category: string[] = [
    "Sports",
    "Clothes",
    "Accessories",
    "Technology",
  ];

  const [searchTxt, setSearctTxt] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearctTxt(value)
  }

  const clickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTxt)
  }

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
          <Link to="login" className="mx-6">
            Login
          </Link>
          <Link to="signup" className="mx-6">
            Sign Up
          </Link>
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
