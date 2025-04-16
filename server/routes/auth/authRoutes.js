import express from 'express'
import { logoutUser, userAuthMiddleware, userLogin, userRegister } from '../../controllers/auth/authController.js';

const authRouter = express.Router();

authRouter.post('/register',userRegister);
authRouter.post('/login',userLogin);
authRouter.post('/logout',logoutUser);
authRouter.get('/check-auth',userAuthMiddleware,(req,res)=>{
    const user = req.user;
    
    res.status(200).json({
        success:true,
        message:'Authenticated User! ',
        user
    })
});


export{
    authRouter
}