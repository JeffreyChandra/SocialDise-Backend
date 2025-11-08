import { useState } from "react";
import AuthInput from "../components/AuthInput";
import AuthInputSecure from "../components/AuthInputSecure";
import { iconEmail, iconLock, iconPerson } from "../helper/assets";
import API from "../api/axios";
interface SignUpProps {
  setChoosen: React.Dispatch<React.SetStateAction<string>>;
}
const SignUp = ({ setChoosen }: SignUpProps) => {
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    e.preventDefault();
    try {
      const res = await API.post("auth/register", {
        name: name,
        email: email,
        password: password,
      });
      setChoosen("sign_in");
      console.log("Success:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex h-full justify-center items-center font-semibold">
      <div className="bg-surface w-[448px] rounded-[16px] mt-[80px] border-divider-border border-1 px-[39px] py-[57px]">
        <div className="text-[38px] mb-[33.6px]">Sign Up</div>
        <div className="mb-[18.34px]">
          <AuthInput
            text="Nama"
            icon={iconPerson}
            value={name}
            setValue={setName}
          ></AuthInput>
        </div>
        <div className="mb-[18.34px]">
          <AuthInput
            text="Email"
            icon={iconEmail}
            value={email}
            setValue={setEmail}
          ></AuthInput>
        </div>
        <div className="mb-[18.34px]">
          <AuthInputSecure
            text="Password"
            icon={iconLock}
            value={password}
            setValue={setPassword}
          ></AuthInputSecure>
        </div>
        <div className="mb-[30.42px]">
          <AuthInputSecure
            text="Confirm Password"
            icon={iconLock}
            value={confirmPassword}
            setValue={setConfirmPassword}
          ></AuthInputSecure>
        </div>
        <button
          onClick={handleSignUp}
          className="text-[11.16px] bg-blue-primary h-[40.67px] w-full rounded-[7.97px]"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
