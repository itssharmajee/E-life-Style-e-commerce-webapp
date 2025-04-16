import express from "express";
import { upload } from "../../config/cloudinary.js";
import {
    addProduct,
    deleteProduct,
    editProduct,
    fetchAllProducts,
    handleImageUpload,
} from "../../controllers/admin/productController.js";

const adminProductsRoutes = express.Router();

adminProductsRoutes.post(
    "/upload-image",
    upload.single("my_file"),
    handleImageUpload
);
adminProductsRoutes.post("/add", addProduct);
adminProductsRoutes.put("/edit/:id", editProduct);
adminProductsRoutes.delete("/delete/:id", deleteProduct);
adminProductsRoutes.get("/get", fetchAllProducts);

export { adminProductsRoutes };
