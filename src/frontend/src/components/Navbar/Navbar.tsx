import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasAuthToken, hasProfileToken } from "../../lib/checkCookies";
import { useCookies } from "react-cookie";
import CustomerService from "../../services/CustomerService";
import setExpireDate from "../../utils/setExpireDate";
import MainNav from "./MainNav";
import ProductCategory from "./ProductCategory";

export const NavContext = createContext<any>(null);

const Navbar = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const navigate = useNavigate();

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
  }, []);

  return (
    <NavContext.Provider value={cookies}>
      <nav>
        <MainNav />
        <ProductCategory />
      </nav>
    </NavContext.Provider>
  );
};

export default Navbar;
