import { useContext } from "react";
import { ProfileContext } from "./Profile";
import { CustomerProfile } from "../../types/User";

const ProfileDetail = ({
  profile,
}: {
  profile: CustomerProfile | undefined;
}) => {
  const [setEditMode] = useContext(ProfileContext);

  type profileDetail = {
    title: string;
    detail: any;
  };

  const profileDetailList: profileDetail[] = [
    {
      title: "Username",
      detail: profile?.username,
    },
    {
      title: "Email",
      detail: profile?.email,
    },
    {
      title: "Date of Birth",
      detail: profile?.dob,
    },
    {
      title: "Phone Number",
      detail: profile?.phoneNo,
    },
  ];

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold">Your Profile</h1>
      <div className="grid grid-cols-1 gap-6 ml-2">
        {profileDetailList.map((element, index) => (
          <div key={index} className="grid grid-cols-4 pb-4 border-b-[1px]">
            <p className="col-span-1 text-lg font-semibold">
              {element.title} :
            </p>
            <p className="col-span-3 text-lg">{element.detail}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setEditMode(true)}
        className="rounded text-white font-semibold bg-cyan-600 mt-8 px-3 py-2 hover:cursor-pointer"
      >
        Change Profile
      </button>
    </>
  );
};

export default ProfileDetail;
