import express from "express";
import {
  createListing,
  getAllListing,
  getListing,
  getSimilarListing,
} from "../controllers/Listing.js";

const router = express.Router();

router.get("/", getAllListing);
router.get("/:id", getListing);
router.post("/new", createListing);
router.get("/similar/:pmake", getSimilarListing);
export default router;
