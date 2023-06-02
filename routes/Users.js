import express from "express";
import {
  delectedUser,
  editUser,
  getAllUser,
  getSingleUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:username", getSingleUser);
router.delete("/:id", delectedUser);
router.patch("/:id/edit", editUser);

export default router;
