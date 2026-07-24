import express from "express";



import authMiddleware from "../middleware/cartMiddleware.js";
import { addCart, cartCount, clearCart, deleteCart, getCart, updateCart,getCartCount,deleteCartItemsLegth } from "../controllers/addToCartController.js";




const router = express.Router();

router.post("/add", authMiddleware, addCart);

router.get("/all", authMiddleware, getCart);

router.delete("/delete/:productId", authMiddleware, deleteCart);

router.put("/update/:productId", authMiddleware, updateCart);

router.get("/count", authMiddleware, cartCount);

router.delete("/clear", authMiddleware, clearCart);
router.get("/cart-count", authMiddleware, getCartCount);
router.get("/cart-count/delete/:id", authMiddleware, deleteCartItemsLegth);


export default router;