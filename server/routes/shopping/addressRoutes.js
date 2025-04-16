import express from 'express'
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from '../../controllers/shopping/addressController.js';

const addressRoute = express.Router();

addressRoute.post("/add", addAddress);
addressRoute.get("/get/:userId", fetchAllAddress);
addressRoute.delete("/delete/:userId/:addressId", deleteAddress);
addressRoute.put("/update/:userId/:addressId", editAddress);


export{
    addressRoute
}