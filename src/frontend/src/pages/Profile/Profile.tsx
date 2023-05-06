import { useEffect, useState } from "react";
import { CustomerProfile } from "../../types/User";
import { useCookies } from "react-cookie";
import ProfileForm from "./ProfileForm";
import ProfileDetail from "./ProfileDetail";

const Profile = () => {
  const [profile, setProfile] = useState<CustomerProfile>();
  const [editMode, setEditMode] = useState(false);
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    setProfile(cookies.userProfile);
  }, [cookies]);

  return (
    <div className="max-w-5xl mx-auto my-8 p-8 border-[1px] shadow-sm rounded-lg">
      {editMode ? (
        <ProfileForm
          profile={profile}
          editMode={editMode}
          setEditMode={setEditMode}
          setCookies={setCookies}
        />
      ) : (
        <ProfileDetail
          profile={profile}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};

export default Profile;
