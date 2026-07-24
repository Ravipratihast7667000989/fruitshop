import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddllewae.js";
import { updateTracking } from "../controllers/orderController.js";

const router = express.Router();

router.put(
  "/tracking/:orderId",
  isAuthenticated,
  isAdmin,
  updateTracking
);

export default router;