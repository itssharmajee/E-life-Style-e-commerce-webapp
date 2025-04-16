import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createStorage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return result;
}

const upload = multer({ storage: createStorage });

export { upload, imageUploadUtil };
