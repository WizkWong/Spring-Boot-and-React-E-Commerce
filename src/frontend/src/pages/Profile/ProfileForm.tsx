import { CustomerProfile } from "../../types/User";
import useUpdateProfile from "./useUpdateProfile";

const ProfileForm = ({
  profile,
  editMode,
  setEditMode,
  setCookies,
}: {
  profile: CustomerProfile | undefined;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCookies: any;
}) => {
  const [updateProfile] = useUpdateProfile();

  const changeProfileBtn = () => {
    if (!profile) {
      return;
    }
    updateProfile(profile, setCookies);
    setEditMode(!editMode);
  };

  return (
    <>
      <button
        onClick={changeProfileBtn}
        className="rounded text-white font-semibold bg-cyan-600 mt-4 px-3 py-2 hover:cursor-pointer"
      >
        Save Profile
      </button>
    </>
  );
};

export default ProfileForm;
