import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { prescribePatient, searchPatient } from "../controllers/patient.controller.js";
const router = Router();

//secured routes
router.use(verifyUser);
router.route('/prescribe').post(prescribePatient);
router.route('/search-patient').get(searchPatient);
export default router;  //export the router to use in other files
