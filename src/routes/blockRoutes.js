import express from "express";
import {
  blockUser,
  getAllUsers,
  unblockUser,
} from "../controllers/user_block_controller.js";

const router = express.Router();

router.put("/block/:id", blockUser);
router.put("/unblock/:id", unblockUser);
router.get('/all/users', getAllUsers);


export default router;