import { FormAttribute } from "../../types/UserInterfaces"
import FormInput from "../../components/FormInput";

const SignUpForm = ({ form, bttAction }: { form: FormAttribute[], bttAction: (e: React.MouseEvent<HTMLElement>) => void }) => {
  return (
    <div className="max-w-2xl mx-auto my-4 p-8 shadow border-b">
    <h1 className="font-bold text-3xl tracking-wider">Sign Up</h1>
    <FormInput form={form} />
    <button
      onClick={bttAction}
      className="rounded text-white font-semibold bg-cyan-600 px-3 py-2"
    >
      Sign Up
    </button>
  </div>
  )
}

export default SignUpForm