import express from 'express'
import { addProductReview, getProductReviews } from '../../controllers/shopping/reviewController.js';
const reviewRoutes = express.Router();

reviewRoutes.post("/add", addProductReview);
reviewRoutes.get("/:productId", getProductReviews);

export {reviewRoutes};
