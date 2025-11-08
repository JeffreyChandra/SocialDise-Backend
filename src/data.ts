import { imgJhanswen, imgPost } from "./helper/assets";
const posts = [
  {
    id: "0",
    userId: "0",
    name: "Jhanswen Ong",
    profilePic: imgJhanswen,
    postDate: new Date(),
    postImg: imgPost,
    likes: 182538,
    trustScore: 90,
    caption:
      "Pesut Mahakam, satwa asal Kaltim yang hampir punah, tersisa 62 individu.",
    // comments: [
    //   {
    //     name: "ilham",
    //     text: "cuma 52?",
    //     commentDate: new Date(),
    //     likes: 80,
    //   },
    //   {
    //     name: "ilham",
    //     text: "cuma 52?",
    //     commentDate: new Date(),
    //     likes: 80,
    //   },
    // ],
  },
  {
    id: "1",
    userId: "0",
    name: "NewsnahJ Ong",
    profilePic: imgJhanswen,
    postDate: new Date(),
    postImg: imgPost,
    likes: 182538,
    trustScore: 90,
    caption: "Pesutltim yang hampir punah, tersisa 62 individu.",
    // comments: [
    //   {
    //     name: "ilham",
    //     text: "cuma 52?",
    //     commentDate: new Date(),
    //     likes: 80,
    //   },
    // ],
  },
];

const trustedUsers = [
  { profilePic: imgJhanswen, name: "Jhanswen Ong", trust: "90" },
  { profilePic: imgJhanswen, name: "Jhanswen Ong", trust: "90" },
  { profilePic: imgJhanswen, name: "Jhanswen Ong", trust: "90" },
  { profilePic: imgJhanswen, name: "Jhanswen Ong", trust: "90" },
  { profilePic: imgJhanswen, name: "Jhanswen Ong", trust: "90" },
];

const user = {
  id: "0",
  name: "Jhanswen Ong",
  profilePic: imgJhanswen,
  followers: 2344,
  following: 2300,
  trustScore: 90,
};

export { posts, trustedUsers, user };
