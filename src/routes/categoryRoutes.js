import express from "express";
import productupload from "../middleware/multer.js";
import { createCategoryProduct, deleteCategoryProduct, getAllCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", productupload.single("image"), createCategoryProduct);
router.get("/get",getAllCategory);
router.delete("/delete/:id", deleteCategoryProduct);


export default router;