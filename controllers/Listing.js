import { productdata } from "../listing.js";
import ListingModel from "../models/ListingModel.js";
import SaveModel from "../models/SaveModel.js";
import SavedCountModel from "../models/SavedCountModel.js";
import UserModel from "../models/UserModel.js";
import cloudinary from "../utils/cloudinary.js";

// Get ALL /*/ GELL ALL LISTING AVAILABLE IN THE DATABASE /*/
export const getAllListing = async (req, res) => {
  try {
    const listing = productdata;
    if (!listing) return res.status(404).json("No Listing Avaliable");
    res.status(200).json(listing);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
// export const getAllListing = async (req, res) => {
//   try {
//     const listing = await ListingModel.find();
//     if (!listing) return res.status(404).json("No Listing Avaliable");
//     res.status(200).json(listing);
//   } catch (error) {
//     console.log({ error: error.message });
//     res.status(500).json({ error: error.message });
//   }
// };

// Get /*/ GET SINGLE LISTING BY ID THROW REQ.PARAMS /*/
export const getListing = async (req, res) => {
  try {
    const { id } = req.params;
    const Listing = await ListingModel.findById(id);
    res.status(200).json(Listing);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

//Get /*/ GET USER LISTING BY THIER USERNAME THROW REQ.PARAMS /*/
export const getUserList = async (req, res) => {
  try {
    const { username } = req.params;
    const UserItem = await ListingModel.find({ username: username });
    res.status(200).json(UserItem);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

//Create /*/ CREATE A NEW LISTING THIS HAVE ALO OF REQUIRED VALUES /*/
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
        //**// Configure cloudinary uploader and upload_preset: upload destination //**//
        upload_preset: "online-shop",
      });
      if (uploadRes) {
        const NewListing = new ListingModel({
          userId, //* The user details will be grabed from the userId *//  required
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
          pImage: uploadRes, //**/ Listing set to Configured Image /**/
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

// GET //**// Get Similar Listing By Make || Brand  //**//
export const getSimilarListing = async (req, res) => {
  try {
    const { pmake } = req.params;
    const SimilarList = await ListingModel.find({ pmake: pmake });
    res.status(200).json(SimilarList);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getMakeList = async (req, res) => {
  try {
    const { pmake } = req.params;
    const Make = await ListingModel.find({ pmake: pmake });
    res.status(200).json(Make);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

// Post //**/ Like And Save //**//
export const SaveItem = async (req, res) => {
  const { userId, listingId } = req.body;
  try {
    const Item = await ListingModel.findById(listingId);
    const User = await UserModel.findById(userId);
    const saved = new SaveModel({
      userId,
      pname: Item.pname,
      pPrice: Item.pPrice,
      pImage: Item.pImage,
      pdesc: Item.pdesc,
      listingId,
    });

    const savedCount = new SavedCountModel({
      listingId,
      userId,
      name: User.name,
      userProfile: User.userProfile,
    });

    const savedItem = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { saved: saved } },
      { new: true }
    );

    const savedC = await ListingModel.findByIdAndUpdate(
      listingId,
      { $push: { likes: savedCount } },
      { new: true }
    );

    const savecount = await savedCount.save();
    const save = await saved.save();
    res.status(200).json({ savecount, save });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
