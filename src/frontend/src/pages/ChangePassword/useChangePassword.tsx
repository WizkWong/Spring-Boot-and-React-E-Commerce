import { useEffect, useState } from "react";
import { ChangePassword, ChangePasswordValidation } from "../../types/User";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";

const useChangePassword = () => {
  const [pwd, setPwd] = useState<ChangePassword>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<ChangePasswordValidation>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPwd({ ...pwd, [name]: value });
  };

  const validatePassword = (pwd: ChangePassword): ChangePasswordValidation => {
    const errors: ChangePasswordValidation = {};

    if (!pwd.oldPassword) {
      errors.oldPassword = "Old Password is required";
    }
    if (!pwd.newPassword) {
      errors.newPassword = "New Password is required";
    } else if (pwd.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    } else if (pwd.newPassword !== pwd.confirmPassword) {
      errors.confirmPassword = "Confirm Password must be same as Password";
    }

    return errors;
  };

  const updatePassword = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFormErrors(validatePassword(pwd));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const changePassword = async () => {
        try {
          const { status } = await CustomerService.changePassword(
            pwd.oldPassword,
            pwd.newPassword
          );
          if (status === 200) {
            setIsHidden(false);
          }
        } catch (error: any) {
          if (error?.response?.status === 403) {
            setFormErrors({ oldPassword: "Wrong Old Password!" });
          } else {
            console.log(error);
          }
        }
      };
      changePassword();
    }
  }, [formErrors]);

  const closeDialog = () => {
    setIsHidden(true);
    navigate("/profile");
  };

  return [
    pwd,
    formErrors,
    handleChangePassword,
    updatePassword,
    isHidden,
    closeDialog,
  ] as const;
};

export default useChangePassword;
