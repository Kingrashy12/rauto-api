import express from "express";
import {
  addRemoveFriend,
  delectedUser,
  editUser,
  getAllUser,
  getIdUser,
  getSingleUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:username", getSingleUser);
router.get("/notify/:username", getIdUser);
router.delete("/:id/delete", delectedUser);
router.patch("/:id/edit", editUser);
router.patch("/:username/follow", addRemoveFriend);

export default router;
