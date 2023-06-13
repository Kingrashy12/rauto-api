import express from "express";
import {
  createListing,
  getAllListing,
  getBodyType,
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
router.get("/:condition/:body/get", getBodyType);
router.post("/new", createListing);
export default router;
