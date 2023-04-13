import { useEffect, useState } from "react";
import CustomerService from "../../services/CustomerService";
import { CustomerAuth } from "../../types/User";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useSignUp = () => {
  const [customerAuth, setCustomerAuth] = useState<CustomerAuth>({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerAuth({ ...customerAuth, [name]: value });
  };

  const validation = (customerAuth: CustomerAuth): string => {
    let error: string = "";
    if (!customerAuth.username || !customerAuth.password) {
      error = "Please fill in all the field";
    }
    return error;
  };

  const loginAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFormErrors(validation(customerAuth));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (formErrors.length === 0 && isSubmit) {
      CustomerService.login(customerAuth)
        .then((response) => {
          console.log(response);
          if (response.data.token) {
            setCookies("authToken", response.data.token)
          }
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 403) {
            setFormErrors("Fail to login, invalid username or password");
          } else {
            console.log(error);
            alert("The server has occur an error, please try again next time");
          }
        });
    }
  }, [formErrors]);

  return [customerAuth, formErrors, handleChange, loginAuth] as const;
};

export default useSignUp;
