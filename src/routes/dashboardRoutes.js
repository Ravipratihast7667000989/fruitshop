import express from "express";

import {
    productStockDetails
}
from "../controllers/dashboardController.js";


const router = express.Router();



router.get(
"/stock-details",
productStockDetails
);



export default router;