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
  const { userId, userProfile } = req.body;
  try {
    if (id === userId) {
      if (userProfile) {
        const uploadRes = await cloudinary.uploader.upload(userProfile, {
          upload_preset: "users-profile",
        });
        if (uploadRes) {
          const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
            new: true,
          });

          res.status(200).json(updatedUser);
        }
      }
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

export const addRemoveFriend = async (req, res) => {};
