import express from "express";
import { fetchFilteredProducts, getProductDetails } from "../../controllers/shopping/productController.js";

const shoppingProductsRoutes = express.Router();

shoppingProductsRoutes.get("/get", fetchFilteredProducts);
shoppingProductsRoutes.get("/get/:id", getProductDetails);

export { shoppingProductsRoutes };
