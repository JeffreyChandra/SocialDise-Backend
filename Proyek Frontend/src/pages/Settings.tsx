import { iconPerson } from "../helper/assets";

interface SettingsProps {
  user: {
    id: string;
    name: string;
    profilePic: string;
    followers: number;
    following: number;
    trustScore: number;
  };
}
const Settings = ({ user }: SettingsProps) => {
  return (
    <div className="w-full h-full px-[69px] pt-[43px]">
      <div className="w-full h-[185px] bg-surface border border-divider-border rounded-[4px] flex items-center px-[46px] justify-between">
        <div className="flex gap-[45px] items-center">
          <div className="flex items-center justify-center w-[115px] h-[115px] bg-[#d4d4d4] rounded-[100px] mr-2">
            <img className="w-[60px] h-[60px]" src={iconPerson}></img>
          </div>
          <div className="text-[22px]">{user.name}</div>
        </div>
        <button className="w-[179px] h-[42px] bg-blue-primary text-[15px] rounded-[4px]">
          Change photo
        </button>
      </div>
    </div>
  );
};

export default Settings;
