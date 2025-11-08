import { iconComment, iconLike, iconShare } from "../helper/assets";
import TrustBar from "./TrustBar";

interface User {
  email: string;
  followers: number;
  following: number;
  id: string;
  name: string;
  password: string;
}
interface ProfilePostCardProps {
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

const ProfilePostCard = ({ post }: { post: ProfilePostCardProps }) => {
  return (
    <div className="flex gap-[26px] px-[14px]  items-center min-w-[401px] h-[228px] bg-surface border border-divider-border rounded-[20px]">
      <div className="flex-shrink-0 w-[174px] h-[164px] rounded-[10px] overflow-hidden">
        {post.mediaUrl.toLowerCase().endsWith(".mp4") ? (
          <video
            src={post.mediaUrl}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img className="object-cover h-full w-full" src={post.mediaUrl}></img>
        )}
      </div>
      <div className="">
        <div className="text-[12px] mb-[8px]">
          {post.user.name}: {post.content}
        </div>
        <div className="flex gap-[1px]">
          <img className="w-[27px] h-[27px]" src={iconLike} />
          <img className="w-[27px] h-[27px]" src={iconComment} />
          <img className="w-[27px] h-[27px]" src={iconShare} />
        </div>
        <div className="text-[11px] mb-[11px]">{post.likesCount} likes</div>
        <div>
          <TrustBar
            text={100 - parseFloat(post.trustedScore) * 100}
            hBar="20px"
            wBar="163px"
            textSize="11px"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
