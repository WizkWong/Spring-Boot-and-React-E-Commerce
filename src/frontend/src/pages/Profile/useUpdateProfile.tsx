import { useState, useContext, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import { CustomerProfile, CustomerValidation } from "../../types/User";
import validateCustomer from "../../utils/validateCustomer";
import { ProfileContext } from "./Profile";

const useUpdateProfile = (profile: CustomerProfile) => {
  const [setEditMode, setCookies] = useContext(ProfileContext);
  const [profileInput, setProfileInput] = useState<CustomerProfile>(profile);
  const [formErrors, setFormErrors] = useState<CustomerValidation>({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileInput({ ...profileInput, [name]: value });
  };

  const changeProfile = () => {
    setFormErrors(
      validateCustomer({
        username: profileInput.username,
        email: profileInput.email,
        phoneNo: profileInput.phoneNo,
        dob: profileInput.dob,
      })
    );
    setIsSubmit(true);
  };

  const cancelChangeProfile = () => {
    setEditMode(false);
  };

  const updateProfile = async (profile: CustomerProfile, setCookies: any) => {
    try {
      const { status, data } = await CustomerService.updateProfile(profile);
      if (status === 200) {
        setCookies("userProfile", profileInput);
        setCookies("authToken", data.token, { maxAge: 2628288 });
      }
    } catch (error: any) {
      if (error.response.data.message === "User is taken") {
        setFormErrors({ ...formErrors, username: "Username is taken" });
      } else {
        console.log(error);
        alert("The server has occur an error, please try again next time");
      }
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      updateProfile(profileInput, setCookies);
      setIsSubmit(false);
      setEditMode(false);
    }
  }, [isSubmit]);

  return [
    profileInput,
    formErrors,
    handleChangeProfile,
    changeProfile,
    cancelChangeProfile,
  ] as const;
};

export default useUpdateProfile;
