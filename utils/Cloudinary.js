import cloudinary from "cloudinary";
const Cloudinary = cloudinary.v2;
import dotEnv from "dotenv";

dotEnv.config();

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default Cloudinary;
