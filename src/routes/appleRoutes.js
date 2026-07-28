import express from "express";

import upload from "../middleware/multer.js";

import {
    addProduct,
    getProducts,
    getSingleProduct,
    searchProduct,
    updateProduct,
    deleteProduct

} from "../controllers/appleController.js";


const router = express.Router();



router.post(
    "/add",
    upload.single("image"),
    addProduct
);



router.get(
    "/all",
    getProducts
);



router.get(
    "/single/:id",
    getSingleProduct
);



router.get(
    "/search",
    searchProduct
);



router.put(
    "/update/:id",
    upload.single("image"),
    updateProduct
);



router.delete(
    "/delete/:id",
    deleteProduct
);



export default router;