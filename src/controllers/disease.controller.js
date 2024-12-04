
import { Diseases } from "../models/disease.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const searchDiseaseByString = asyncHandler(async (req, res) => {
    const {str} = req.query;
    const disease = await Diseases.find({name: {$regex: `^${str}`, $options: 'i'}}).limit(10);
    res.status(202).json(new ApiResponse(202,disease,"Fetched Diseases successfully"));
});
export {searchDiseaseByString};