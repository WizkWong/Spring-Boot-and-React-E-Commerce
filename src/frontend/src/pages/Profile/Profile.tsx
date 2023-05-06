import { useEffect, useState } from "react";
import { CustomerProfile } from "../../types/User";
import { Cookies } from "react-cookie";
import CustomerService from "../../services/CustomerService";

const Profile = () => {
  const [profile, setProfile] = useState<CustomerProfile>();
  const cookies = new Cookies();

  useEffect(() => {
    setProfile(cookies.get("userProfile"));
  });

  const changeProfileBtn = () => {
    if (!profile) {
      return;
    }
    const changeProfile = async () => {
      try {
        const { status } = await CustomerService.updateProfile(profile);
        if (status === 200) {
          const { data } = await CustomerService.getProfile();
          cookies.set("userProfile", data);
          setProfile(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    changeProfile();
  };

  return (
    <div className="flex flex-row items-center">
      <h1>Your Profile</h1>
      <h3>Username</h3>
      <p>{profile?.username}</p>
      <h3>Email</h3>
      <p>{profile?.email}</p>
      <h3>Date of Birth</h3>
      <p>{profile?.dob}</p>
      <h3>Phone Number</h3>
      <p>{profile?.phoneNo}</p>
      <button
        onClick={changeProfileBtn}
        className="rounded text-white font-semibold bg-cyan-600 mt-4 px-3 py-2 hover:cursor-pointer"
      >
        Change Profile
      </button>
    </div>
  );
};

export default Profile;
