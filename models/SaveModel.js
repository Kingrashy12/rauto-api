import mongoose from "mongoose";

const SaveSchema = mongoose.Schema(
  {
    listingId: { type: String, required: true },
    userId: { type: String, required: true },
    pname: { type: String, required: true },
    pPrice: { type: Number, required: true },
    pdesc: { type: String, required: true },
    pImage: { type: Object },
  },
  { timestamps: true }
);

const SaveModel = mongoose.model("Saved", SaveSchema);

export default SaveModel;
