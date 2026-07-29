import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "pdfs",
        resource_type: "raw",
        format: async () => "pdf",
    },
});

export default multer({ storage });