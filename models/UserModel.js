import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: String,
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    userProfile: { type: Object },
    saved: { type: Array, default: [] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
