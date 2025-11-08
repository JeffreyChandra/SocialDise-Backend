import { useState } from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
interface AuthNavbarProps {
  choose: string;
}
interface NavItemProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}
const NavItem = ({ text, isActive, onClick }: NavItemProps) => (
  <div
    onClick={onClick}
    className={`relative py-[6px] hover:cursor-pointer after:content-[''] after:w-full after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-white after:transition-transform after:duration-300 after:ease-in-out ${
      isActive ? "after:scale-x-100" : "after:scale-x-0"
    }`}
  >
    {text}
  </div>
);

const AuthNavbar = ({ choose }: AuthNavbarProps) => {
  const [choosen, setChoosen] = useState<string>(choose || "sign_in");

  return (
    <>
      <div className="bg-back w-[100%] h-[74px] border-b border-divider-border flex justify-between items-center font-semibold text-[15px] px-[29px] fixed">
        <div>SOCIAL DISE</div>
        <div className="flex justify-center items-center gap-[37px]">
          <NavItem
            text="Sign In"
            isActive={choosen === "sign_in"}
            onClick={() => setChoosen("sign_in")}
          />
          <NavItem
            text="Sign Up"
            isActive={choosen === "sign_up"}
            onClick={() => setChoosen("sign_up")}
          />
        </div>
      </div>
      <div className="h-[100vh]">
        {choosen === "sign_in" ? (
          <SignIn />
        ) : (
          <SignUp setChoosen={setChoosen} />
        )}
      </div>
    </>
  );
};

export default AuthNavbar;
