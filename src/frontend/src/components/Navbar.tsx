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
        <div className="flex-none mx-4">E-Commerce</div>
        <div className="flex-1 flex item-center">
          <input className="grow pl-2 py-2" placeholder="Search ..."></input>
          <img
            src={search}
            alt="search"
            className="flex-none bg-yellow-600 px-3"
          ></img>
        </div>
        <div className="flex-none flex items-center">
          <p className="px-6">Login</p>
          <p className="px-6">Sign Up</p>
        </div>
      </div>
      <div className="flex items-center bg-gray-100 py-1">
        {nav_category.map((element) => (
          <p className="px-8 hover:text-black text-gray-600 font-bold">
            {element}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
