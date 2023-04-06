import { Form } from "../types/Form";
import FormInput from "../components/FormInput";

const SignUp = () => {
  const form: Form = {
    title: "Sign Up",
    attribute: [
      { label: "Name", type: "text", name: "name" },
      { label: "Password", type: "password", name: "password" },
      { label: "Confirm Password", type: "password", name: "confirmPassword" },
      { label: "Date Of Birth", type: "date", name: "dateOfBirth" },
      { label: "Email", type: "email", name: "email" },
      { label: "Phone Number", type: "text", name: "phoneNumber" },
    ],
    btnText: "Sign Up",
  };

  return (
    <>
      <FormInput form={form} />
    </>
  );
};

export default SignUp;
