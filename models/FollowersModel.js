import mongoose from "mongoose";

const FollowersSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    userProfile: { type: Object },
  },
  { timestamps: true }
);

const FollowersModel = mongoose.model("Followers", FollowersSchema);
export default FollowersModel;
