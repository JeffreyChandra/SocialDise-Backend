import { useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import AuthInputSecure from "../components/AuthInputSecure";
import { iconEmail, iconLock } from "../helper/assets";
import { useState } from "react";
import API from "../api/axios";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const res = await API.post("auth/login", {
        email: email,
        password: password,
      });
      console.log("Success:", res.data);
      localStorage.setItem("access_token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex h-full justify-center items-center font-semibold">
      <div className="bg-surface w-[448px]  rounded-[16px] border-divider-border border-1 px-[39px] py-[69px]">
        <div className="text-[38px] mb-[33.6px]">Sign In</div>
        <div className="mb-[18.34px]">
          <AuthInput
            text="Email"
            icon={iconEmail}
            value={email}
            setValue={setEmail}
          ></AuthInput>
        </div>
        <div className="mb-[17.42px]">
          <AuthInputSecure
            text="Password"
            icon={iconLock}
            value={password}
            setValue={setPassword}
          ></AuthInputSecure>
        </div>

        <div className="text-[12.76px] text-end mb-[18px]">
          Forget Password?
        </div>
        <button
          onClick={handleSignIn}
          className="text-[11.16px] bg-blue-primary h-[40.67px] w-full rounded-[7.97px]"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
