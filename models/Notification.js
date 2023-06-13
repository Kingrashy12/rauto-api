import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    Img: { type: Object },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notifications", NotificationSchema);

export default NotificationModel;
