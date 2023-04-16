import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { hasAuthToken } from "./lib/checkCookies";
import { useNavigate } from "react-router-dom";
import CustomerService from "./services/CustomerService";
import { useCookies } from "react-cookie";

function App() {
  const location = useLocation();
  const excludedPaths: string[] = ["/signup", "/login"];

  // check if the current path is in the excludedPaths list
  const shouldDisplayNavbar: boolean = !excludedPaths.some((path) =>
    location.pathname.includes(path)
  );

  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies();

  const isLogin = (): boolean => {
    if (!hasAuthToken()) {
      navigate("/login");
      return false;
    }

    // get user data, if error probably means authToken is expired, so navigate to login page
    CustomerService.getProfile()
      .then((response) => {
        setCookies("userProfile", response.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
        return false;
      });

    return true;
  };

  return (
    <>
      {shouldDisplayNavbar && <Navbar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {isLogin() && (
          <>
            <Route path="/profile" element={<h1>Your profile</h1>} />
            <Route path="/cart" element={<h1>Your cart</h1>} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
