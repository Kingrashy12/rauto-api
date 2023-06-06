import mongoose from "mongoose";

const CountSchema = mongoose.Schema(
  {
    listingId: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    userProfile: { type: String, required: true },
  },
  { timestamps: true }
);

const SavedCountModel = mongoose.model("SavedCount", CountSchema);

export default SavedCountModel;
