import express from "express";
import {
  blockUser,
  unblockUser,
} from "../controllers/user_block_controller.js";

const router = express.Router();

router.put("/block/:id", blockUser);

router.put("/unblock/:id", unblockUser);

export default router;