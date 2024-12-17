import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required: true,
    },
    name: {
        type:String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    weight: Number,
    MobileNo:Number,
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    medicalHistory:{
        chronicDisease:String,
        allergy:String,
        familyDisease:String,
        previousSurgery:String,
        socialHistory: String,
        drugHistory:String,
    },
},{timestamps:true});

export const Patient = mongoose.model("Patient",patientSchema);