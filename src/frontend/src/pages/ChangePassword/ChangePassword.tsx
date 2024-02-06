import DialogBox from "../../components/DialogBox";
import { FormAttribute } from "../../types/UserInterfaces";
import ChangePasswordForm from "./ChangePasswordForm";
import useChangePassword from "./useChangePassword";

const ChangePassword = () => {
  const [
    pwd,
    formErrors,
    handleChangePassword,
    updatePassword,
    isHidden,
    closeDialog,
  ] = useChangePassword();

  const form: FormAttribute[] = [
    {
      label: "Old Password",
      type: "password",
      name: "oldPassword",
      value: pwd.oldPassword,
      onChange: handleChangePassword,
      errorMsg: formErrors.oldPassword,
    },
    {
      label: "New Password",
      type: "password",
      name: "newPassword",
      value: pwd.newPassword,
      onChange: handleChangePassword,
      errorMsg: formErrors.newPassword,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: pwd.confirmPassword,
      onChange: handleChangePassword,
      errorMsg: formErrors.confirmPassword,
    },
  ];

  return (
    <>
      <ChangePasswordForm
        form={form}
        btnAction={updatePassword}
      />
      <DialogBox
        title="Successfully Change Password!"
        content="You have successfully change your old password to new password."
        hidden={isHidden}
        onClose={closeDialog}
      />
    </>
  );
};

export default ChangePassword;
