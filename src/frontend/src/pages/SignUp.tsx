import FormInput from "../components/FormInput";
import { FormAttribute } from "../types/UserInterfaces";
import { Customer } from "../types/User";
import { useState } from "react";
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

  const form: FormAttribute[] = [
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
    ];

  return (
    <div className="max-w-2xl mx-auto my-4 p-8 shadow border-b">
      <h1 className="font-bold text-3xl tracking-wider">"Sign Up"</h1>
      <FormInput form={form} />
      <button
        onClick={saveCustomer}
        className="rounded text-white font-semibold bg-cyan-600 px-3 py-2"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
