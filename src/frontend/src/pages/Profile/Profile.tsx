import { useEffect, useState, createContext } from "react";
import { CustomerProfile } from "../../types/User";
import ProfileForm from "./ProfileForm";
import ProfileDetail from "./ProfileDetail";
import CustomerService from "../../services/CustomerService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const ProfileContext = createContext<any>(null);

const Profile = () => {
  const [profile, setProfile] = useState<CustomerProfile>();
  const [editMode, setEditMode] = useState(false);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await CustomerService.getProfile();
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cookies]);

  return (
    <ProfileContext.Provider value={[setEditMode, setCookies]}>
      <div className="max-w-5xl mx-auto my-8 p-8 border-[1px] shadow-sm rounded-lg">
        {editMode && profile ? (
          <ProfileForm profile={profile} />
        ) : (
          <>
            <ProfileDetail profile={profile} />
            <button
              className="rounded text-white font-semibold bg-cyan-600 ml-4 px-3 py-2 hover:cursor-pointer"
              onClick={() => navigate("change-password")}
            >
              Change Password
            </button>
          </>
        )}
      </div>
    </ProfileContext.Provider>
  );
};

export default Profile;
