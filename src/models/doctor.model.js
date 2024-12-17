import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { emailValidator } from "../constant.js";

const addressSchema = new mongoose.Schema({
    streetName:{
        type:String,
        required:true,
    },
    dispensaryName: String,
    city:{
        type: String,
        required: true
    },
    state:{
        type:String,
        required:true
    },
    postal:{
        type: Number,
        required :true,
    },
    practiceDays:{
        type: [String],
        required:true,
    },
    practiceHours:{
        startTime:String,
        endTime:String,
    }
},{timestamps:true})

const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is required"],
    },
    email:{
        type: String,
        required: [true,"email is required"],
        unique:true,
        lowercase: true,
        index: true,
        match:[emailValidator,"Please Fill valid email"]
    },
    password:{
        type: String,
        required: [true,"password is required"]
    },
    isCompleted:{
        type: Boolean,
        default: false,
        enum:[true,false]
    },
    degree:{
        type: String,
        required:true,
    },
    regNo:{
        type:String,
        required:true,
    },
    specialisation_degree:{
        type: String,
        enum: ["MD","MS"],
    },
    specialisation:{
        type: String,
    },
    superSpecialisation_degree:{
        type: String,
        required:true,
        enum:["DM","M.Ch"]
    },
    superSpecialisation:{
        type :String
    },
    otherDetails:{
        type:String,
    },
    dispensaryAddress:{
        type:[addressSchema],
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true});
doctorSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});
doctorSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
doctorSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.accessToken_Secret,
        {
            expiresIn:process.env.accessTokenExpiry,
        }
    )
};
doctorSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.refreshToken_Secret,
        {
            expiresIn: process.env.refreshTokenExpiry,
        }
    )
}
export const Doctor = mongoose.model("Doctor",doctorSchema);