import express from "express";
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import connectDB from "./dataBase/db.js";
import productRoutes from "./products/route.js";
import cors from 'cors'
import categoryRoutes from "./category/route.js";
import productRamRoutes from "./products/otherProductApi/Ram/ramRoutes.js";
import productWeightRoutes from "./products/otherProductApi/Weight/route.js";
import productSizeRoutes from "./products/otherProductApi/Size/route.js";
import orderRoutes from "./order/route.js";
import userRoutes from "./user/route.js";
import cookieParser from 'cookie-parser'
import jwt from "jsonwebtoken";
import searchRoutes from "./search/route.js";
import reviewRoutes from "./review/route.js";
import saleRoutes from "./salesData/route.js";
import bannerRoutes from "./homeBannner/route.js";
import saleBannerRoutes from "./saleBanner/route.js";
import accessoryRoutes from "./Acccessory/route.js";
import subProductRoutes from "./AccessoryProduct/route.js";
import UserModel from './user/model.js'


dotenv.config()
let app = express();
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser());


const allowedOrigins = [

  // "https://pricemaart.vercel.app",
 "http://localhost:5173",
  
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));  
connectDB()



app.use('/category',categoryRoutes)
app.use('/products',productRoutes)
// app.use('/category/subcategory',subcategory)
app.use('/product/productRam',productRamRoutes)
app.use('/product/productWeight',productWeightRoutes)
app.use('/product/productSize',productSizeRoutes)
app.use('/orders',orderRoutes)
app.use('/user',userRoutes)
app.use('/saleBanner',saleBannerRoutes)
app.use('/review',reviewRoutes)
app.use('/banner',bannerRoutes)
app.use('/sales',saleRoutes)
app.use('/search',searchRoutes)
app.use('/accessory',accessoryRoutes)
app.use('/subProduct',subProductRoutes)


app.get("/auth-status", (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.json({ isLogin: false, message: "User is not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

   return res.json({ isLogin: true, user: decoded });
  } catch (error) {
   return res.json({ isLogin: false, message: "Invalid or expired token" });
  }
});




let PORT = process.env.PORT;
app.listen(PORT,() => {
  console.log(`Server is running at ${PORT} port`);
});
