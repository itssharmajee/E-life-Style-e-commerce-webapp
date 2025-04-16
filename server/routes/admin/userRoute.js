import express from 'express'
import { fetchAllUsersDetails } from '../../controllers/admin/userController.js';
const userRoute = express.Router();

userRoute.get("/details", fetchAllUsersDetails);
export{
    userRoute
}