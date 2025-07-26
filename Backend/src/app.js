
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';




const app = express();

app.use(cors({
  origin: 'http://localhost:8000' ||"*",

  credentials: true,
 methods: ["GET", "POST", "PUT", "DELETE"],

}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.json({ limit: "19kb" }));
                 
app.use(cookieParser());  
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/products', productRoutes);

      

export { app };
