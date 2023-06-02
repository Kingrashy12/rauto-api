import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import cloudinary from "../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

export const createPost = async (req, res) => {
  try {
    const {
      userId,
      pname,
      pcolor,
      pPrice,
      pImage,
      pdesc,
      pyear,
      pbody,
      pcondition,
      pmake,
    } = req.body;
    const user = await UserModel.findById(userId);
    if (pImage) {
      const uploadRes = await cloudinary.uploader.upload(pImage, {
        upload_preset: "online-shop",
      });
      if (uploadRes) {
        const Post = new PostModel({
          userId,
          name: user.name,
          username: user.username,
          userProfile: user.userProfile,
          userCover: user.userCover,
          pname,
          pyear,
          pcolor,
          pdesc,
          pbody,
          pcondition,
          pPrice,
          pmake,
          slug: uuidv4(),
          pImage: uploadRes,
        });
        const newPost = await Post.save();
        res.status(201).json(newPost);
      }
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  //   const { pname } = req.params;
  const { slug } = req.params;
  try {
    const post = await PostModel.findOne(slug);
    if (!post) return res.status(404).json({ msg: "Listing nof found" });
    res.status(200).json(post);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    // const { id } = req.params;
    // const user = await UserModel.findOne({ id: id });
    // if (!user) return res.status(404).json({ error: "User not found" });
    // const Post = await PostModel.find({ user });
    // if (!Post) return res.status(404).json({ msg: "User Have No Listing yet" });
    // res.status(200).json(Post);
    const { userId } = req.params;
    const Post = await PostModel.find({ userId });
    if (!Post) return res.status(404).json({ msg: "User Have No Listing yet" });
    res.status(200).json(Post);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
