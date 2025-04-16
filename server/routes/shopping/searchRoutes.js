import express from 'express'
import { searchProducts } from '../../controllers/shopping/searchController.js';

const shoppingSearchRoutes = express.Router();

shoppingSearchRoutes.get("/:keyword", searchProducts);

export{shoppingSearchRoutes}


