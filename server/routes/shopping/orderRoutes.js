import express from 'express'
import { capturePayment, createOrder, getAllOrdersByUser, getOrderDetails } from '../../controllers/shopping/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.post("/capture", capturePayment);
orderRouter.get("/list/:userId", getAllOrdersByUser);
orderRouter.get("/details/:id", getOrderDetails);


export { orderRouter }
