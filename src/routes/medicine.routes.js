import {Router} from "express";
import { searchMedicineBystring } from "../controllers/medicine.controller.js";
const router = Router();

router.route("/search").get(searchMedicineBystring);

export default router;