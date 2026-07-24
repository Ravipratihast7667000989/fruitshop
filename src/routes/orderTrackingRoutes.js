import express from "express";

import {
    createOrder,
    updateTracking,
    getTracking
} from "../controllers/orderController.js";

import { isAuthenticated } from "../middleware/trackingUserMiddleware.js";
import { isAdmin } from "../middleware/adminMiddllewae.js";

const router = express.Router();

router.post("/create", isAuthenticated, createOrder);

router.put(
    "/tracking/:orderId",
    isAuthenticated,
    isAdmin,
    updateTracking
);

router.get(
    "/tracking/:orderId",
    isAuthenticated,
    getTracking
);

export default router;