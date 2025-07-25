  import { Router } from "express";
  
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProduct, getProducts, updateProductQuantity } from "../controllers/product.controller.js";

const router = Router();


    router.route("/").post(verifyJWT,addProduct)
    router.route("/:id/quantity").put(verifyJWT,updateProductQuantity)
    router.route("/").get(verifyJWT,getProducts)

export default router;

