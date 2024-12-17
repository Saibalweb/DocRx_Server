import { Router } from "express";
import { addAddress, completeRegister, loginDoctor, refreshAccessToken, registerDoctor } from "../controllers/doctor.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerDoctor);
router.route("/login").post(loginDoctor);

//secured route with refreshToken
router.route("/refresh-token").post(refreshAccessToken);
//secured routes with accessToken
router.use(verifyUser);
router.route("/complete-details").post(completeRegister);
router.route("/add-address").post(addAddress);

export default router;