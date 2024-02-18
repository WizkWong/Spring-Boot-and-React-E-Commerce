import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import profile from "../../assets/profile_img.svg";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [cookies] = useCookies();
  const [isOpen, setIsOpen] = useState(false);
  const username: string = cookies.authToken ? cookies.authToken.username : "user";
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef?.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownElement: { label: string; url: string }[] = [
    {
      label: "Your Profile",
      url: "profile",
    },
    {
      label: "Sign Out",
      url: "logout",
    },
  ];

  return (
    <div ref={dropdownRef} className="relative flex flex-col items-center w-48 h-11">
      <button
        onClick={() => {setIsOpen(!isOpen);}}
        className="flex flex-row items-center gap-3 w-full h-full px-2 rounded-lg border-2 border-transparent hover:border-gray-400 focus:border-black"
      >
        <img src={profile} alt="profile_img" className="w-10 h-10" />
        <p className="text-left">{username}</p>
      </button>
      {isOpen && (
        <div className="absolute top-12 flex flex-col items-start bg-white py-2 w-full rounded-lg shadow z-50">
          {dropdownElement.map((element, index) => (
            <Link
              key={index}
              to={element.url}
              className="w-full p-2 text-lg hover:bg-gray-200"
              onClick={() => {setIsOpen(false);}}
            >
              {element.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
