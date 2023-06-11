import mongoose from "mongoose";

const FollowingSchema = mongoose.Schema(
  {
    userId: { type: String },
    username: { type: String, required: true },
    name: { type: String, required: true },
    userProfile: { type: Object },
  },
  { timestamps: true }
);

const FollowingModel = mongoose.model("Following", FollowingSchema);
export default FollowingModel;
