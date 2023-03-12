import { CloudinaryStorage } from "multer-storage-cloudinary";
import Cloudinary from "./Cloudinary.js";
import multer from "multer";
const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  folder: "my_folder",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});
export const upload = multer({ storage: storage });
