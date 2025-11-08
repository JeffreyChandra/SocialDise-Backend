import type { Dispatch, SetStateAction } from "react";

interface AuthInputProps {
  text: string;
  icon: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
const AuthInput = ({ text, icon, value, setValue }: AuthInputProps) => {
  return (
    <div className="flex justify-center items-center bg-white rounded-[8px] px-[15px] ">
      <img className="w-[31.1px] pr-[13px]" src={icon}></img>
      <input
        placeholder={text}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="focus:outline-none text-[12.7px] w-full h-[56px] text-surface py-[18px] placeholder:text-[#696969] placeholder:text-[12.7px]"
      />
    </div>
  );
};

export default AuthInput;
