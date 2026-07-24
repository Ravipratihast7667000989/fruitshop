// routes/authRoutes.js
import express from "express";
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  resendOtp,
  searchStudents,
  updateStudent,
  profile,

} from "../controllers/authController.js";
import { createStudent } from "../controllers/studentController.js";
import upload from "../middleware/authMiddleware.js";
import productupload from "../middleware/multer.js";
import authauthMiddleware from "../middleware/auth.middleware.js";
import { markAttendance, getAStudents, AttendanceCount, monthlyAttendance } from "../controllers/attendanceController.js";
import { createOrder } from "../controllers/paymentController.js";
import { verifyPayment } from "../controllers/paymentVerifyController.js";
import {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile
} from "../controllers/pdfController.js";
import { updatePassword } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifytoken.middleware.js";

import {
  addFee,
  getAllFees,
  getSingleFee,
  deleteFee,
} from "../controllers/FeeController.js";
const router = express.Router();

router.post("/register", productupload.single("image"), register);

router.put("/update-password", verifyToken, updatePassword);
router.get("/profile", authauthMiddleware, profile);
router.post("/login", login);
router.post("/send-otp", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);
router.post("/attendence", upload.single("image"), markAttendance);
router.get("/all-students-attendance", getAStudents);
// payment routes
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

// router.post("/create-student", getAttendanceCount)

router.post("/create-student", createStudent);
router.get("/student-Attendance-count", AttendanceCount);
router.get("/search", searchStudents);
// update api
router.put("/update/:id", upload.single("userimage"), updateStudent);
router.get('/monthly', monthlyAttendance)


// pdf router

router.post("/upload", upload.single("pdf"), uploadFile);
router.get("/files", getFiles);
router.get("/download/:id", downloadFile);
router.delete("/delete/:id", deleteFile);


router.post("/add", addFee);

router.get("/all", getAllFees);

router.get("/:id", getSingleFee);

router.delete("/delete/:id", deleteFee);

export default router;
