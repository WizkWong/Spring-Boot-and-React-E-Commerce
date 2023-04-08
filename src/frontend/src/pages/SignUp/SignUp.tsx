import { FormAttribute } from "../../types/UserInterfaces";
import SignUpForm from "./SignUpForm";
import useSignUp from "./useSignUp";

// customer sign up to create new customer account
const SignUp = () => {
  const [customer, handleChangeUser, handleChangeDob, saveCustomer] = useSignUp()

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

  return <SignUpForm form={form} btnAction={saveCustomer} />;
};

export default SignUp;
