import { useState } from "react";
import { Customer } from "../../types/User";
import CustomerService from "../../services/CustomerService";

const useSignUp = () => {
  const [customer, setCustomer] = useState<Customer>({
    user: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNo: "",
    },
    dob: "",
  });

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, user: { ...customer.user, [name]: value } });
  };

  const handleChangeDob = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    CustomerService.createCustomer(customer)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return [customer, handleChangeUser, handleChangeDob, saveCustomer] as const;
};

export default useSignUp;
