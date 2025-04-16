import express from 'express'
import { addToCartItem, deleteCartItem, fetchCartItems, updateCartItem } from '../../controllers/shopping/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add',addToCartItem);
cartRouter.put('/update-cart',updateCartItem);
cartRouter.delete('/:userId/:productId',deleteCartItem);
cartRouter.get('/get/:userId',fetchCartItems);

export{
    cartRouter
}
