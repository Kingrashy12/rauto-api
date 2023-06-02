import express from "express";
import {
  createListing,
  getAllListing,
  getListing,
} from "../controllers/Listing.js";

const router = express.Router();

router.get("/", getAllListing);
router.get("/:id", getListing);
router.post("/new", createListing);
export default router;
