import { useEffect, useState, createContext } from "react";
import { CustomerProfile } from "../../types/User";
import ProfileForm from "./ProfileForm";
import ProfileDetail from "./ProfileDetail";
import CustomerService from "../../services/CustomerService";

export const ProfileContext = createContext<any>(null);

const Profile = () => {
  const [profile, setProfile] = useState<CustomerProfile>();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await CustomerService.getProfile();
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <ProfileContext.Provider value={[setEditMode]}>
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
