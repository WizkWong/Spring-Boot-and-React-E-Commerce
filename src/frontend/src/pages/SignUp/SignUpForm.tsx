import { FormAttribute } from "../../types/UserInterfaces"
import FormValidation from "../../components/FormValidation";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ form, btnAction }: { form: FormAttribute[], btnAction: (e: React.MouseEvent<HTMLElement>) => void }) => {
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
        <h1 className="font-bold text-3xl tracking-wider mb-8">Sign Up</h1>
        <FormValidation form={form} />
        <button
          onClick={btnAction}
          className="rounded text-white font-semibold bg-cyan-600 mt-4 px-3 py-2"
        >
          Sign Up
        </button>
      </div>
    </>
  )
}

export default SignUpForm