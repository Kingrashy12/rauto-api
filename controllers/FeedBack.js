import FeedBackModel from "../models/FeedBackModel.js";
import ListingModel from "../models/ListingModel.js";
import UserModel from "../models/UserModel.js";

export const addFeedBack = async (req, res) => {
  const { userId, body, listingId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    const feedback = new FeedBackModel({
      userId,
      name: user.name,
      userProfile: user.userProfile,
      listingId,
      body,
    });
    const Listing = await ListingModel.findByIdAndUpdate(
      listingId,
      { $push: { comment: feedback } },
      { new: true }
    );
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getList = async (req, res) => {};
