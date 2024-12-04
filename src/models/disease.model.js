import mongoose from "mongoose";
const diseasesSchema = new mongoose.Schema({
    name: String,
    text: String
});
 export const Diseases = mongoose.model("Diseases", diseasesSchema);