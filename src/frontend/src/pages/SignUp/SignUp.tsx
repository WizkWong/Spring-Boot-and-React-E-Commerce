import { FormAttribute } from "../../types/UserInterfaces";
import SignUpForm from "./SignUpForm";
import useSignUp from "./useSignUp";

// customer sign up to create new customer account
const SignUp = () => {
  const [
    customer,
    formErrors,
    handleChangeUser,
    handleChangeDob,
    saveCustomer,
  ] = useSignUp();

  const form: FormAttribute[] = [
    {
      label: "Username",
      type: "text",
      name: "username",
      value: customer.user.username,
      onChange: handleChangeUser,
      errorMsg: formErrors.username,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: customer.user.password,
      onChange: handleChangeUser,
      errorMsg: formErrors.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: customer.user.confirmPassword,
      onChange: handleChangeUser,
      errorMsg: formErrors.confirmPassword,
    },
    {
      label: "Date Of Birth",
      type: "date",
      name: "dob",
      value: customer.dob,
      onChange: handleChangeDob,
      errorMsg: formErrors.dob,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: customer.user.email,
      onChange: handleChangeUser,
      errorMsg: formErrors.email,
    },
    {
      label: "Phone Number",
      type: "text",
      name: "phoneNo",
      value: customer.user.phoneNo,
      onChange: handleChangeUser,
      errorMsg: formErrors.phoneNo,
    },
  ];

  return <SignUpForm form={form} btnAction={saveCustomer} />;
};

export default SignUp;
