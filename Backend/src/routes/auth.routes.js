  import { Router } from "express";
  import { registerUser, loginUser, logOutUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(
  registerUser
);
    router.route("/login").post(loginUser)
    router.route("/logout").post(verifyJWT,logOutUser)
    router.route("/refesh-Token").post(refreshAccessToken)

export default router;

