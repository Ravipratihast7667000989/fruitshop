import express from "express";
import productupload from "../middleware/multer.js";
import { createProduct ,deleteProduct,getAllProducts, searchProduct} from "../controllers/best_selling_product_controller.js";
import { deleteCart } from "../controllers/addToCartController.js";

const router = express.Router();

router.post("/create", productupload.single("image"), createProduct);
router.get("/all", getAllProducts);
router.get("/search",searchProduct);
router.delete("/delete/:id", deleteProduct);
router.delete("/delete/:productId",deleteCart);


export default router;