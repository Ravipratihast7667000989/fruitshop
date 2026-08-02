import express from "express";
import {  getAllOrders, getOrderByOrderId, paymentSuccess, updateOrderStatus } from "../controllers/OrderSucessController.js";

const router = express.Router();

router.post("/payment-success", paymentSuccess);
router.get("/all/order",getAllOrders);

router.get("/search/:orderId", getOrderByOrderId);/// Duplicate 
router.get("/order/:orderId",getOrderByOrderId); 
router.put("/order/:orderId/status",updateOrderStatus);

export default router;