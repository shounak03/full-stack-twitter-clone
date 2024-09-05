import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import path from "path"

import dotenv from 'dotenv'
dotenv.config()


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided");
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found at path: ${localFilePath}`);
        }

        // Resolve full path
        const fullPath = path.resolve(localFilePath);

        const response = await cloudinary.uploader.upload(fullPath, {
            resource_type: "auto"
        });

        console.log("File uploaded successfully", response.url);
        fs.unlinkSync(fullPath);
        return response;

    } catch (error) {
        console.error("Error in uploadOnCloudinary:", error.message);
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export { uploadOnCloudinary }