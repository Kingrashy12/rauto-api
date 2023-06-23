import FollowersModel from "../models/FollowersModel.js";
import FollowingModel from "../models/FollowingModel.js";
import NotificationModel from "../models/Notification.js";
import UserModel from "../models/UserModel.js";
// import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getIdUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username: username });
    res.status(200).json(user);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const { userId, userProfile, name, username, email } = req.body;
  try {
    if (id === userId) {
      const uploadRes = await cloudinary.uploader.upload(userProfile, {
        upload_preset: "users-profile",
      });

      const newUpdate = {
        userId,
        name: name,
        username: username,
        email: email,
        userProfile: uploadRes || "",
      };

      const updatedUser = await UserModel.findByIdAndUpdate(id, newUpdate, {
        new: true,
      });

      res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ msg: "Access denied" });
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    const friends = await Promise.all(
      user.followers.map((id) => UserModel.findById(id))
    );
    const formattedFriend = friends.map(
      ({ _id, name, userProfile, username, userCover }) => {
        return { _id, name, userProfile, username, userCover };
      }
    );
    res.status(200).json(formattedFriend);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json(error);
  }
};

export const delectedUser = async (req, res) => {
  const { id } = req.params;
  try {
    const delecteduser = await UserModel.findByIdAndDelete(id);
    res.status(200).json(delecteduser);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  const username = req.params;
  try {
    const { userId } = req.body;

    if (username === userId) {
      return res.status(403).json("Action Forbidden");
    } else {
      try {
        const followUser = await UserModel.findOne(username);
        const followingUser = await UserModel.findById(userId);

        if (!followUser.followers.includes(userId)) {
          await followUser.updateOne({ $push: { followers: userId } });
          await followingUser.updateOne({ $push: { following: username } });
          const notify = new NotificationModel({
            title: "Followed You",
            body: followingUser.name,
            Img: followingUser.userProfile,
          });
          const newNotify = await notify.save();
          await followUser.updateOne({ $push: { notifications: notify } });
          res.status(200).json(newNotify, "User Followed");
        } else {
          // res.status(403).json("Already followed by you");
          await followUser.updateOne({ $pull: { followers: userId } });
          await followingUser.updateOne({ $pull: { following: username } });
          const notify = new NotificationModel({
            title: "UnFollowed You",
            body: followingUser.name,
            Img: followingUser.userProfile,
          });
          const newNotify = await notify.save();
          await followUser.updateOne({ $push: { notifications: notify } });
          res.status(200).json(newNotify, "User Unfollowed");
        }
      } catch (error) {
        console.log({ error: error.message });
        res.status(500).json({ error: error.message });
      }
    }

    // res.status(200).json();
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
