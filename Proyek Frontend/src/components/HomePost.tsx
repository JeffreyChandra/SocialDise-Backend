import { iconLike, iconComment, iconShare, iconPerson } from "../helper/assets";
import TrustBar from "./TrustBar";

// interface HomePostCommentProps {
//   name: string;
//   text: string;
//   commentDate: Date;
//   likes: number;
// }
interface User {
  email: string;
  followers: number;
  following: number;
  id: string;
  name: string;
  password: string;
}
interface HomePostProps {
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

const HomePost = ({ post }: { post: HomePostProps }) => {
  return (
    <div className="bg-surface w-[503px]  border border-divider-border rounded-[9px] scale-100">
      <div className="flex items-center pl-[17px] h-[90px] ">
        <div className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-4xl mr-2">
          <img className="w-[20px] h-[20px]" src={iconPerson}></img>
        </div>
        <div className="text-[16px]">{post.user.name}</div>
      </div>
      <div className="w-full h-[410px]">
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
      <div className="px-[17px] pt-[14px] pb-[10px]">
        <div className="flex gap-[9px] mb-[10px]">
          <img className="w-[22px]" src={iconLike} />
          <img className="w-[22px]" src={iconComment} />
          <img className="w-[22px]" src={iconShare} />
        </div>
        <div className="flex justify-between items-center mb-[10px]">
          <div className="text-[11px] ">{post.likesCount} likes</div>
          <div className="">
            <TrustBar
              text={100 - parseFloat(post.trustedScore) * 100}
              hBar="17px"
              wBar="178px"
              textSize="11px"
            ></TrustBar>
          </div>
        </div>
        <div className="text-[12px] mb-[10px] truncate">
          {post.user.name}: {post.content}
        </div>
        {/* <div className="text-[10px]">
          View all {post.comments.length} comment
          {post.comments.length > 1 ? "s" : ""}
        </div> */}
      </div>
    </div>
  );
};

export default HomePost;
