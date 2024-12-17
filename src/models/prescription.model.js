import mongoose from "mongoose";
const medicineSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    frequency:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    timing:{
        type:String,
    },
    otherAdviseOnMedicine:{
        type:String,
    }

})
const prescriptionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Patient"
    },
    doctorChamberAddress:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Doctor"
    },
    investigationDone:{
        type :[String] || String,
    },
    investigationNeeded:{
        type :[String] || String,
    },
    cheifComplaint:{
        type :[String]||String,
    },
    diagonosis:{
        type :[String] || String,
    },
    medicinePrescribed:{
        required:true,
        type:[medicineSchema]
    },
    extraTreatmentAdvice:{
        type:String,
    }

},{timestamps:true});

export const Presciption = mongoose.model("Prescription",prescriptionSchema);