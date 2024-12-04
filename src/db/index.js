import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async ()=>{
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`mongodb server connected to :${res?.connections[0]?.host}/${res?.connections[0]?.port}`);
    } catch (error) {
        console.log("Coudnot connect to mongodb database!");
        process.exit(1);
    }
}
export {connectDB};