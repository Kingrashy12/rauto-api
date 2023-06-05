import express from "express";
import {
  SaveItem,
  createListing,
  getAllListing,
  getListing,
  getMakeList,
  getSimilarListing,
  getUserList,
} from "../controllers/Listing.js";

const router = express.Router();

router.get("/", getAllListing);
router.get("/:id", getListing);
router.get("/similar/:pmake", getSimilarListing);
router.get("/user/:username", getUserList);
router.get("/brand/:pmake", getMakeList);
router.post("/new", createListing);
router.post("/:id/:userId/save", SaveItem);
export default router;
