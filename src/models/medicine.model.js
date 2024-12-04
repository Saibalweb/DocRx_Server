import mongoose from "mongoose";
const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Is_discontinued: {
    type:String,
    enum: ["FALSE", "TRUE"],
  },
  manufacturer_name:String,
  type: String,
  pack_size_label: String,
  short_composition1: String,
  short_composition2: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);
Medicine.insertOne = () => {
  throw new Error("Inserting new documents is not allowed.");
};

Medicine.insertMany = () => {
  throw new Error("Inserting new documents are not allowed.");
};
export {Medicine};
