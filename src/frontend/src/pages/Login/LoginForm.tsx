import { FormAttribute } from "../../types/UserInterfaces";
import FormInput from "../../components/FormInput";
import { useNavigate } from "react-router-dom";

const LoginForm = ({
  form,
  errorMsg,
  btnAction,
}: {
  form: FormAttribute[];
  errorMsg: string;
  btnAction: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="ml-10 mt-5 font-bold text-2xl tracking-wider hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        {import.meta.env.VITE_WEBSITE_TITLE}
      </button>
      <div className="max-w-2xl mx-auto my-4 p-8 shadow border-b">
        <h1 className="font-bold text-3xl tracking-wider">Login</h1>
        <FormInput form={form} />
        <p className="text-center font-semibold text-red-500">{errorMsg}</p>
        <button
          onClick={btnAction}
          className="rounded text-white font-semibold bg-cyan-600 px-3 py-2"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default LoginForm;
