import { Form } from "../types/Form";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { Customer } from "../types/User";
import CustomerService from "../services/CustomerService";

// customer sign up to create new customer account
const SignUp = () => {
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

  const form: Form = {
    title: "Sign Up",
    attribute: [
      {
        label: "Name",
        type: "text",
        name: "username",
        value: customer.user.username,
        onChange: handleChangeUser,
      },
      {
        label: "Password",
        type: "password",
        name: "password",
        value: customer.user.password,
        onChange: handleChangeUser,
      },
      {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        value: customer.user.confirmPassword,
        onChange: handleChangeUser,
      },
      {
        label: "Date Of Birth",
        type: "date",
        name: "dob",
        value: customer.dob,
        onChange: handleChangeDob,
      },
      {
        label: "Email",
        type: "email",
        name: "email",
        value: customer.user.email,
        onChange: handleChangeUser,
      },
      {
        label: "Phone Number",
        type: "text",
        name: "phoneNo",
        value: customer.user.phoneNo,
        onChange: handleChangeUser,
      },
    ],
    btnText: "Sign Up",
    onClick: saveCustomer,
  };

  return (
    <>
      <FormInput form={form} />
    </>
  );
};

export default SignUp;
