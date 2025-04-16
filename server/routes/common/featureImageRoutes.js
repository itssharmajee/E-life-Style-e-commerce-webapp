import express from 'express'
import { addFeatureImage, getFeatureImages } from '../../controllers/common/featureImageController.js';

const commonfeatureImageRoute = express.Router();

commonfeatureImageRoute.post("/add", addFeatureImage);
commonfeatureImageRoute.get("/get", getFeatureImages);

export { commonfeatureImageRoute }
