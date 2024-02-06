import FormValidation from "../../components/FormValidation";
import { FormAttribute } from "../../types/UserInterfaces";

const ChangePasswordForm = ({
  form,
  btnAction,
}: {
  form: FormAttribute[];
  btnAction: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <>
      <div className="max-w-2xl mx-auto my-8 p-8 border-[1px] shadow-sm rounded-lg">
        <h1 className="font-bold text-3xl tracking-wider mb-8">
          Change Password
        </h1>
        <FormValidation form={form} />
        <button
          onClick={btnAction}
          className="rounded text-white font-semibold bg-cyan-600 mt-4 px-3 py-2 hover:cursor-pointer"
        >
          Change Password
        </button>
      </div>
    </>
  );
};

export default ChangePasswordForm;
