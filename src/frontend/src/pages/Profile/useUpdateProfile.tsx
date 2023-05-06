import CustomerService from "../../services/CustomerService";
import { CustomerProfile } from "../../types/User";

const useUpdateProfile = () => {
  const updateProfile = async (
    profile: CustomerProfile,
    setCookies: any
  ) => {
    try {
      const { status } = await CustomerService.updateProfile(profile);
      if (status === 200) {
        const { data } = await CustomerService.getProfile();
        setCookies("userProfile", data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [updateProfile] as const;
};

export default useUpdateProfile;
