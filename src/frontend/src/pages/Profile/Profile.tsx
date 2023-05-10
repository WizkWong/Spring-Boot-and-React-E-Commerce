import { useEffect, useState, createContext } from "react";
import { CustomerProfile } from "../../types/User";
import { useCookies } from "react-cookie";
import ProfileForm from "./ProfileForm";
import ProfileDetail from "./ProfileDetail";

export const ProfileContext = createContext<any>(null);

const Profile = () => {
  const [profile, setProfile] = useState<CustomerProfile>();
  const [editMode, setEditMode] = useState(false);
  const [cookies, setCookies] = useCookies(["userProfile"]);

  useEffect(() => {
    setProfile(cookies.userProfile);
  }, [cookies]);

  return (
    <ProfileContext.Provider value={[setEditMode, setCookies]}>
      <div className="max-w-5xl mx-auto my-8 p-8 border-[1px] shadow-sm rounded-lg">
        {editMode && profile ? (
          <ProfileForm profile={profile} />
        ) : (
          <ProfileDetail profile={profile} />
        )}
      </div>
    </ProfileContext.Provider>
  );
};

export default Profile;
