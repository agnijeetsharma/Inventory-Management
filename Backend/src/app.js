
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",  
    credentials: true,
}));
app.use(express.json());
app.use(express.json({ limit: "19kb" }));
app.use(express.urlencoded({ extended: true, limit: "18kb" }));
app.use(express.static("public"));                     
app.use(cookieParser());  

app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/products', productRoutes);

      

export { app };
