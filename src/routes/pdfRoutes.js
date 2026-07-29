import express from "express";

import upload from "../middleware/pdfMiddleware.js";

import { deletePdf, downloadPdf, getAllPdf, uploadPdf } from "../controllers/productController.js";

const router=express.Router();

router.post("/upload",upload.single("pdf"),uploadPdf);

router.get("/all",getAllPdf);

router.get("/download/:id",downloadPdf);
router.delete("/delete/:id", deletePdf);

export default router;