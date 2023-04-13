import { FormAttribute } from "../../types/UserInterfaces";
import LoginForm from "./LoginForm";
import useLogin from "./useLogin";

const Login = () => {
  const [customerAuth, handleChange, loginAuth] = useLogin();

  const form: FormAttribute[] = [
    {
      label: "Username",
      type: "text",
      name: "username",
      value: customerAuth.username,
      onChange: handleChange,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: customerAuth.password,
      onChange: handleChange,
    },
  ];

  return <LoginForm form={form} btnAction={loginAuth} />;
};

export default Login;
