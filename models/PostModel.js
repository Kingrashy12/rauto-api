import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    userProfile: { type: Object },
    userCover: { type: Object },
    pname: { type: String, required: true },
    pcolor: { type: String, required: true },
    pyear: { type: String, required: true },
    pdesc: { type: String, required: true },
    pmake: { type: String, required: true },
    pbody: { type: String, required: true },
    pcondition: { type: String, required: true },
    pPrice: { type: Number, required: true },
    pImage: { type: Object, required: true },
    comment: { type: Array, default: [] },
    likes: { type: Map, of: Boolean },
    slug: { type: String, required: true },
  },
  { timestamp: true }
);

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
