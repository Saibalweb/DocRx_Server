import { Medicine } from "../models/medicine.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const searchMedicineBystring = asyncHandler(async(req,res)=>{
    const {str}= req.query;
    if(str.length<3){
        throw new ApiError(400,"Search string must be at least 3 characters long");
    }
    const medicine = await Medicine.find({name:{$regex:`^${str}`,$options:'i'}}).limit(5);
    if(medicine.length===0) throw new ApiError(404,"No Medicine Found");
    res.status(202).json(new ApiResponse(202,medicine,"Successfully fetched medicines"));
});
export{searchMedicineBystring};