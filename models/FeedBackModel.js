import mongoose from "mongoose";

const FeedBackSchema = mongoose.Schema(
  {
    listingId: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    userProfile: { type: Object },
    body: { type: String },
  },
  { timestamp: true }
);

const FeedBackModel = mongoose.model("FeedBacks", FeedBackSchema);

export default FeedBackModel;
