import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
const verifyUser =asyncHandler( async(req,res,next)=>{
    try {
        const tokenString = req?.header("Authorization") || req?.cookies?.accessToken;
        if(!tokenString){
            throw new ApiError(404,"No token Provided");
        }
        const token = tokenString.split(" ")[1];
        const decoded = jwt.verify(token,process.env.accessToken_Secret)
        const userId = decoded._id;
        const user = await Doctor.findById(userId).select("-password -refreshToken");
        if(!user){
            throw new ApiError(400,"Invalid accessToken!/Token is expired!");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(500,error?.message||"invalid token")
    }
});
export {verifyUser};