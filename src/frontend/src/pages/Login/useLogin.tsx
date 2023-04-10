import { useState } from "react";

const useSignUp = () => {
  const [customerAuth, setCustomerAuth] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerAuth({ ...customerAuth, [name]: value });
  };

  const loginAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(customerAuth);
  };
  return [customerAuth, handleChange, loginAuth] as const;
};

export default useSignUp;
