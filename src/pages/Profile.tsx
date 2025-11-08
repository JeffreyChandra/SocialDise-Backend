import { useEffect, useState } from "react";
import ProfilePostCard from "../components/ProfilePostCard";
import API from "../api/axios";
import { iconPerson } from "../helper/assets";
interface User {
  email: string;
  followers: number;
  following: number;
  id: string;
  name: string;
  password: string;
}
interface ProfileProps {
  comments: [];
  content: string;
  id: number;
  likesCount: number;
  mediaUrl: string;
  title: string;
  trustedScore: string;
  user: User;
  userId?: number;
}
const Profile = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [posts, setPosts] = useState<ProfileProps[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.post("posts/by-user", {
          userId: user.id,
        });
        setPosts(res.data);
        console.log("Success:", res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="w-full px-[68px] pt-[55px]">
      <div className="flex items-center pl-[42px] md:w-full min-w-[501px] h-[251px] bg-surface border border-divider-border rounded-[20px]">
        <div className="flex items-center justify-center w-[149px] h-[149px] bg-[#d4d4d4] rounded-[100px] mr-2">
          <img className="w-[100px] h-[100px]" src={iconPerson}></img>
        </div>
        <div className="flex flex-col gap-[13px] ml-[36px]">
          <div className="text-[32px] font-bold">{user.name}</div>
          <div className="flex gap-[24.68px]">
            <div>Followers: {user.followers}</div>
            <div>Following: {user.following}</div>
            {/* <div>Trust Score: {user.trustScore}%</div> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-[30px] justify-center gap-x-[30px] mt-[30px]">
        {/* {user.posts.map((post, index) => (
          <ProfilePostCard key={index} post={post} />
        ))} */}
        {posts
          // .filter((post) => post.userId === "0")
          .map((post, index) => (
            <ProfilePostCard key={index} post={post} />
          ))}
      </div>
    </div>
  );
};

export default Profile;
