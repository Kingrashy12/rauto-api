import express from "express";
import {
  RemoveSave,
  delectedUser,
  editUser,
  getAllUser,
  getSingleUser,
  getUserSaved,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:username", getSingleUser);
router.get("/saved/:id", getUserSaved);
router.delete("/:id", delectedUser);
router.patch("/:id/edit", editUser);
router.delete("/unsave/:id", RemoveSave);

export default router;
