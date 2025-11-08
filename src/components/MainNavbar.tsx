import Home from "../pages/Home";
import { user } from "../data";
import { iconHome, iconProfile, iconLogout } from "../helper/assets";
import { useState } from "react";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import { useNavigate } from "react-router-dom";
interface IconNavbarProps {
  text: string;
  icon: string;
  currentNav: string;
  color?: "white" | "error-deepfake";
}
const IconNavbar = ({
  text,
  icon,
  currentNav,
  color = "white",
}: IconNavbarProps) => {
  const colorClasses = {
    white: "text-white",
    "error-deepfake": "text-error-deepfake",
  } as const;
  return (
    <div
      className={`flex items-end gap-[14px] ${
        color === "white" ? "hover:bg-surface" : "hover:bg-amber-950"
      } hover:cursor-pointer w-full h-[46px] rounded-[6px] py-[12px] pl-[14px] ${
        text === currentNav ? "bg-surface" : ""
      }`}
    >
      <img className="w-[20px]" src={icon}></img>
      <div className={colorClasses[color]}>{text}</div>
    </div>
  );
};
interface Navbar {
  setCurrentNav: React.Dispatch<React.SetStateAction<number>>;
  currentNav: string;
}
const Navbar = ({ setCurrentNav, currentNav }: Navbar) => {
  const navigation = useNavigate();
  return (
    <div className="fixed flex flex-col justify-between w-[250px] h-full border-r border-divider-border px-[24px] py-[44px]">
      <div>
        <div className="mb-[40px] ml-[14px]">SOCIAL DISE</div>
        <div
          onClick={() => {
            setCurrentNav(0);
          }}
          className="mb-[15px]"
        >
          <IconNavbar text="Home" icon={iconHome} currentNav={currentNav} />
        </div>
        <div
          onClick={() => {
            setCurrentNav(1);
          }}
          className="mb-[15px]"
        >
          <IconNavbar
            text="Profile"
            icon={iconProfile}
            currentNav={currentNav}
          />
        </div>
        {/* <div
          onClick={() => {
            setCurrentNav(2);
          }}
          className="mb-[15px]"
        >
          <IconNavbar
            text="Settings"
            icon={iconSettings}
            currentNav={currentNav}
          />
        </div> */}
      </div>
      <div
        onClick={() => {
          navigation("/");
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
        }}
      >
        <IconNavbar
          text="Log out"
          icon={iconLogout}
          currentNav={currentNav}
          color="error-deepfake"
        />
      </div>
    </div>
  );
};
type PageKey = "Home" | "Profile" | "Settings";

const pageComponents: Record<PageKey, React.JSX.Element> = {
  Home: <Home />,
  Profile: <Profile />,
  Settings: <Settings user={user} />,
};

const MainNavbar = () => {
  const mainNav: PageKey[] = ["Home", "Profile", "Settings"];
  const [currentNav, setCurrentNav] = useState(0);
  return (
    <div className="flex h-[100vh] w-[100vw] font-semibold">
      <div>
        <Navbar
          setCurrentNav={setCurrentNav}
          currentNav={mainNav[currentNav]}
        ></Navbar>
      </div>
      <div className="ml-[250px] w-full">
        {pageComponents[mainNav[currentNav]]}
      </div>
    </div>
  );
};

export default MainNavbar;
