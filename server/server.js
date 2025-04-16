import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from "cors"
import { mongoConnection } from "./config/mongoDb.js";
import { authRouter } from "./routes/auth/authRoutes.js";
import { adminProductsRoutes } from "./routes/admin/productsRoute.js";
import { shoppingProductsRoutes } from "./routes/shopping/productsRoutes.js";
import { cartRouter } from "./routes/shopping/cartsRoutes.js";
import { addressRoute } from "./routes/shopping/addressRoutes.js";
import { orderRouter } from "./routes/shopping/orderRoutes.js";
import { adminOrderRoutes } from "./routes/admin/orderRoute.js";
import { shoppingSearchRoutes } from "./routes/shopping/searchRoutes.js";
import { reviewRoutes } from "./routes/shopping/reviewRoutes.js";
import { commonfeatureImageRoute } from "./routes/common/featureImageRoutes.js";
import { userRoute } from "./routes/admin/userRoute.js";

dotenv.config();

mongoConnection(process.env.DB_URL);

const app = express();
const PORT = process.env.PORT || 5000 ;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// middlewares

app.use(cors({
    origin:FRONTEND_URL,
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth',authRouter);

app.use('/api/admin/products',adminProductsRoutes);
app.use('/api/admin/orders',adminOrderRoutes);
app.use('/api/admin/users',userRoute);

app.use('/api/shop/products',shoppingProductsRoutes);
app.use('/api/shop/cart',cartRouter);
app.use('/api/shop/address',addressRoute);
app.use('/api/shop/order',orderRouter);
app.use('/api/shop/search',shoppingSearchRoutes);
app.use('/api/shop/review',reviewRoutes);

app.use('/api/common/feature',commonfeatureImageRoute);

app.listen(PORT, ()=>{
    console.log(`Sever is running on port : ${PORT}`);
})

