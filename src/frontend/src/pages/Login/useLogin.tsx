import { useState } from "react";
import CustomerService from "../../services/CustomerService";
import { CustomerAuth } from "../../types/User";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const [customerAuth, setCustomerAuth] = useState<CustomerAuth>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerAuth({ ...customerAuth, [name]: value });
  };

  const loginAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    CustomerService.login(customerAuth)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return [customerAuth, handleChange, loginAuth] as const;
};

export default useSignUp;
