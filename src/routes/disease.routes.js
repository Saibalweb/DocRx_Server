import {Router} from "express";
import { searchDiseaseByString } from "../controllers/disease.controller.js";
const router = Router();

router.route("/search").get(searchDiseaseByString);
export default router;