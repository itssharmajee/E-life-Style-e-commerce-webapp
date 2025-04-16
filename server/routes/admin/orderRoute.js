import express from 'express'
import { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from '../../controllers/admin/orderController.js';

const adminOrderRoutes = express.Router();

adminOrderRoutes.get("/get", getAllOrdersOfAllUsers);
adminOrderRoutes.get("/details/:id", getOrderDetailsForAdmin);
adminOrderRoutes.put("/update/:id", updateOrderStatus);

export { adminOrderRoutes }
