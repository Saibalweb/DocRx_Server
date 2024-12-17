import mongoose from "mongoose";
import { Patient } from "../models/patient.model.js";
import { Presciption } from "../models/prescription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const prescribePatient = asyncHandler(async(req,res)=>{
    const {patientDetails,prescribePatient} = req?.body;
    const {name,age,weight,MobileNo,gender,medicalHistory} = patientDetails;
    const {doctorChamberAddress,investigationDone,investigationNeeded,cheifComplaint,diagonosis,medicinePrescribed,extraTreatmentAdvice}= prescribePatient;
    if(!name || !age || !gender){
        throw new ApiError(400,"Please provide neccessay details about patient-name,age,gender");
    }
    if(!doctorChamberAddress){
        throw new ApiError(400,"please provide chamber address!");
    }
    if(!medicinePrescribed){
        throw new ApiError(400,"Please add medicine!");
    }
    const patient = await Patient.create({
        doctorId:req?.user?._id,
        name,
        age,
        weight,
        MobileNo,
        gender,
        medicalHistory
    });
    if(!patient){
        throw new ApiError(500,"something went wrong please try again!")
    };
    const presciption = await Presciption.create({
        doctorId:req?.user?._id,
        patientId:patient._id,
        doctorChamberAddress: new mongoose.Types.ObjectId(`${doctorChamberAddress}`),
        investigationDone,
        investigationNeeded,
        cheifComplaint,
        diagonosis,
        medicinePrescribed,
        extraTreatmentAdvice
    });
    if(!presciption){
        throw new ApiError(500,"something wrong while saving ...please try again!");
    }
    res.status(202).json(new ApiResponse(202,{presciption,patient},"Added prescription successfully!"));
});
const searchPatient = asyncHandler(async(req,res)=>{

})
export {prescribePatient,searchPatient};