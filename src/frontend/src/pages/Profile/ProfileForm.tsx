import FormValidation from "../../components/FormValidation";
import { CustomerProfile } from "../../types/User";
import useUpdateProfile from "./useUpdateProfile";
import { FormAttribute } from "../../types/UserInterfaces";

const ProfileForm = ({ profile }: { profile: CustomerProfile }) => {
  const [
    profileInput,
    formErrors,
    handleChangeProfile,
    changeProfile,
    cancelChangeProfile,
  ] = useUpdateProfile(profile);

  const form: FormAttribute[] = [
    {
      label: "Username",
      type: "text",
      name: "username",
      value: profileInput.username,
      onChange: handleChangeProfile,
      errorMsg: formErrors.username,
    },
    {
      label: "Date Of Birth",
      type: "date",
      name: "dob",
      value: profileInput.dob,
      onChange: handleChangeProfile,
      errorMsg: formErrors.dob,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: profileInput.email,
      onChange: handleChangeProfile,
      errorMsg: formErrors.email,
    },
    {
      label: "Phone Number",
      type: "text",
      name: "phoneNo",
      value: profileInput.phoneNo,
      onChange: handleChangeProfile,
      errorMsg: formErrors.phoneNo,
    },
  ];

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold">Your Profile</h1>
      <div className="grid grid-cols-1 gap-6 ml-2">
        <FormValidation form={form} />
      </div>
      <button
        onClick={changeProfile}
        className="rounded text-white font-semibold bg-cyan-600 mt-4 px-3 py-2 hover:cursor-pointer"
      >
        Save Profile
      </button>
      <button
        onClick={cancelChangeProfile}
        className="rounded text-white font-semibold bg-cyan-600 mt-4 ml-4 px-3 py-2 hover:cursor-pointer"
      >
        Cancel
      </button>
    </>
  );
};

export default ProfileForm;
