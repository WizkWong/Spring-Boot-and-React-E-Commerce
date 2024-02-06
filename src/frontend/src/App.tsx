import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/Logout";
import SearchProduct from "./pages/SearchProduct/SearchProduct";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import { createContext, useState } from "react";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

export const SearchContext = createContext<any>(null);

function App() {
  const location = useLocation();
  const excludedPaths: string[] = ["/signup", "/login"];

  // check if the current path is in the excludedPaths list
  const shouldDisplayNavbar: boolean = !excludedPaths.some((path) =>
    location.pathname.includes(path)
  );

  const useQuery = new URLSearchParams(useLocation().search);
  const searchParam = useQuery.get("search");
  const [searchTxt, setSearctTxt] = useState(searchParam ? searchParam : "");

  return (
    <SearchContext.Provider value={[searchTxt, setSearctTxt]}>
      {shouldDisplayNavbar && <Navbar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<SearchProduct />} />
        <Route path="/product/:id" element={<Product />} />
        {/* required login */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
