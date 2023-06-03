import express from "express";
import { addFeedBack, getList } from "../controllers/FeedBack.js";

const router = express.Router();

router.post("/add/:id", addFeedBack);
router.get("/list/", getList);

export default router;
