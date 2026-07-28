import express from "express";
import {  getAllOrders, getOrderByOrderId, paymentSuccess } from "../controllers/OrderSucessController.js";

const router = express.Router();

router.post("/payment-success", paymentSuccess);
router.get("/all/order",getAllOrders);

router.get("/search/:orderId", getOrderByOrderId);

export default router;