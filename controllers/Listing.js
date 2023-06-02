import { productdata } from "../listing.js";
import ListingModel from "../models/ListingModel.js";
import UserModel from "../models/UserModel.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllListing = async (req, res) => {
  try {
    const listing = await ListingModel.find();
    if (!listing) return res.status(404).json("No Listing Avaliable");
    res.status(200).json(listing);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getListing = async (req, res) => {
  try {
    const { slug } = req.params;
    const Listing = ListingModel.find((p) => p.pname.toLowerCase() === slug);
    res.status(200).json(Listing);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const {
      pname,
      pdesc,
      pyear,
      pcondition,
      pImage,
      pPrice,
      userId,
      pcolor,
      pmake,
      pbody,
    } = req.body;
    const user = await UserModel.findById(userId);
    if (pImage) {
      const uploadRes = await cloudinary.uploader.upload(pImage, {
        upload_preset: "online-shop",
      });
      if (uploadRes) {
        const NewListing = new ListingModel({
          userId,
          name: user.name,
          username: user.username,
          userProfile: user.userProfile,
          userCover: user.userCover,
          pname,
          pdesc,
          pcolor,
          pPrice,
          pmake,
          pyear,
          pbody,
          pcondition,
          pImage: uploadRes,
        });
        const SavedListing = await NewListing.save();
        res.status(201).json(SavedListing);
      }
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
