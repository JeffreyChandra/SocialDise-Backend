import { useEffect, useState, type ChangeEvent } from "react";
import HomePost from "../components/HomePost";
// import HomeTrustedCard from "../components/HomeTrustedCard";
import { iconPlus } from "../helper/assets";
import API from "../api/axios";

interface User {
  email: string;
  followers: number;
  following: number;
  id: string;
  name: string;
  password: string;
}
interface HomeProps {
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
const Home = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [posts, setPosts] = useState<HomeProps[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [content, setContent] = useState("");
  const handleShowCreatePost = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setShowCreatePost(true);
    setContent("");
  };
  const [isLoading, setIsLoading] = useState(false);
  const handlePost = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("media", selectedFile!);
      const res = await API.post("deepfake/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success:", res.data);
      if (!res.data.isSafe) {
        alert(
          "The uploaded media is detected as deepfake and cannot be posted."
        );
        return;
      }
      try {
        const postRes = await API.post(
          "posts",
          {
            title: "New Post",
            content: content,
            mediaUrl: res.data.fileInfo.url,
            userId: user.id,
            trustedScore: res.data.detection.score * 100,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log("Post created successfully:", postRes.data);
        fetchPosts();
      } catch (postError) {
        console.error("Error creating post:", postError);
      }
      alert("Media is safe. Post created successfully.");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setShowCreatePost(false);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await API.get("posts");
      setPosts(res.data);
      console.log("Success:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };
  return (
    <div className="flex ">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#2A2E36] p-6 rounded-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-3"></div>
            <p className="text-white text-sm font-semibold">
              Checking media for deepfake...
            </p>
          </div>
        </div>
      )}
      {showCreatePost && (
        <div
          onClick={() => {
            setShowCreatePost(false);
          }}
          className="bg-black opacity-78  fixed w-[100vw] h-[100vh] top-0 left-0 z-1"
        ></div>
      )}
      <div className="flex flex-col gap-[71px] ml-[78px]">
        {posts.map((post, index) => (
          <HomePost key={index} post={post} />
        ))}
      </div>
      <button
        onClick={handleShowCreatePost}
        className="fixed cursor-pointer bg-surface border border-divider-border rounded-[4px] w-[94px] h-[32px] flex items-center justify-center gap-[6px] bottom-[130px] right-[100px]"
      >
        <img className="w-[20px]" src={iconPlus}></img>
        <div>Create</div>
      </button>
      {showCreatePost && (
        <div className="fixed   z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface border border-divider-border p-[10px]">
          <div className="flex gap-[10px]">
            <div className="relative bg-[#2A2E36] font-bold w-[100px] h-[100px] text-[10px] text-center overflow-hidden border border-divider-border rounded-[4px] text-[#6C707E]">
              {previewUrl ? (
                selectedFile!.type.startsWith("video/") ? (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="text-gray-500 pt-[40px] ">
                  Select file to preview
                </div>
              )}
              <label
                htmlFor="file-upload"
                className="bg-[green] text-white z-2 absolute cursor-pointer top-0 right-0 rounded-[5px] text-[8px] px-[5px] py-[2px] "
              >
                Edit
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className=" bg-[#2A2E36] w-[300px] h-[100px] p-[10px] border border-divider-border rounded-[4px] resize-none outline-none"
              placeholder="What's on your mind?"
            />
          </div>
          <div className="flex mt-[10px] justify-end">
            <button
              onClick={() => {
                setShowCreatePost(false);
              }}
              className="bg-[#2A2E36] text-[10px]  w-[80px] h-[32px] rounded-[4px] mr-[10px] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              className="bg-[#2A2E36] text-[10px]  w-[80px] h-[32px] rounded-[4px] mr-[10px] cursor-pointer"
            >
              Post
            </button>
          </div>
        </div>
      )}
      {/* <div className="mt-[100px] ml-[100px]">
        <div className="text-[21.2px] pb-[8px] pl-[15.13px] border-b border-divider-border mb-[24.89px]">
          Trust Score
        </div>
        {trustedUsers.map((trustedUser, index) => (
          <HomeTrustedCard key={index} trustedUser={trustedUser} />
        ))}
      </div> */}
    </div>
  );
};

export default Home;
