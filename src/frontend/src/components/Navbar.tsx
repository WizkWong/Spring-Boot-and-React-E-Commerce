import search from "../assets/search.svg";

const Navbar = () => {
  const nav_category: string[] = [
    "Sports",
    "Clothes",
    "Accessories",
    "Technology",
  ];

  return (
    <nav>
      <div className="flex items-center bg-gray-300 py-3 text-xl">
        <div className="flex-none mx-4">{import.meta.env.VITE_WEBSITE_TITLE}</div>
        <div className="flex-1 flex item-center">
          <input className="grow pl-2 py-2" placeholder="Search ..."></input>
          <img
            src={search}
            alt="search"
            className="flex-none bg-yellow-600 px-3 hover:cursor-pointer"
          ></img>
        </div>
        <div className="flex-none flex items-center">
          <a className="px-6 hover:cursor-pointer" href="/login">Login</a>
          <a className="px-6 hover:cursor-pointer" href="/signup">Sign Up</a>
        </div>
      </div>
      <div className="flex items-center bg-gray-100 py-1">
        {nav_category.map((element, index) => (
          <p key={index} className="px-8 hover:text-black hover:cursor-pointer text-gray-600 font-bold">
            {element}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
