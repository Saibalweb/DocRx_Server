import mongoose, { Mongoose } from "mongoose";
import { Patient } from "../models/patient.model.js";
import { Presciption } from "../models/prescription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { parse } from "date-fns";
const prescribePatient = asyncHandler(async (req, res) => {
  const { patientDetails, prescribePatient } = req?.body;
  const { name, age, weight, MobileNo, gender, medicalHistory } =
    patientDetails;
  const {
    doctorChamberAddress,
    investigationDone,
    investigationNeeded,
    cheifComplaint,
    diagonosis,
    medicinePrescribed,
    extraTreatmentAdvice,
  } = prescribePatient;
  if (!name || !age || !gender) {
    throw new ApiError(
      400,
      "Please provide neccessay details about patient-name,age,gender"
    );
  }
  if (!doctorChamberAddress) {
    throw new ApiError(400, "please provide chamber address!");
  }
  if (!medicinePrescribed) {
    throw new ApiError(400, "Please add medicine!");
  }
  const patient = await Patient.create({
    doctorId: req?.user?._id,
    name,
    age,
    weight,
    MobileNo,
    gender,
    medicalHistory,
  });
  if (!patient) {
    throw new ApiError(500, "something went wrong please try again!");
  }
  const presciption = await Presciption.create({
    doctorId: req?.user?._id,
    patientId: patient._id,
    doctorChamberAddress: new mongoose.Types.ObjectId(
      `${doctorChamberAddress}`
    ),
    investigationDone,
    investigationNeeded,
    cheifComplaint,
    diagonosis,
    medicinePrescribed,
    extraTreatmentAdvice,
  });
  if (!presciption) {
    throw new ApiError(
      500,
      "something wrong while saving ...please try again!"
    );
  }
  res
    .status(202)
    .json(
      new ApiResponse(
        202,
        { presciption, patient },
        "Added prescription successfully!"
      )
    );
});
const searchPatient = asyncHandler(async (req, res) => {
  try {
    const { doctorId, startDate, endDate, date } = req.query;

    if (!doctorId) {
      return new ApiError(400, "doctorId is required");
    }

    let dateFilter = {};

    const parseCustomDate = (input) => {
      if (!input) return null;
      let format = "dd/MM/yy";
      if (input.length === 10) format = "dd/MM/yyyy";
      return parse(input, format, new Date());
    };

    if (date) {
      const start = parseCustomDate(date);
      if (isNaN(start)) {
        return res.status(400).json({ message: "Invalid date format" });
      }

      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setUTCHours(23, 59, 59, 999);

      dateFilter = { createdAt: { $gte: start, $lte: end } };
    } else if (startDate && endDate) {
      const start = parseCustomDate(startDate);
      const end = parseCustomDate(endDate);

      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({ message: "Invalid date range format" });
      }

      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);

      dateFilter = { createdAt: { $gte: start, $lte: end } };
    }
    console.log("Date Filter:", dateFilter, doctorId);

    const prescriptions = await Presciption.aggregate([
      {
        $match: {
          doctorId: new mongoose.Types.ObjectId(`${doctorId}`),
          ...dateFilter
        }
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patient"
        }
      },
      { $unwind: "$patient" },
      {
        $project: {
          _id: 0,
          patientName: "$patient.name",
          age: "$patient.age",
          gender: "$patient.gender",
          diagnosis: 1,
          investigationDone: 1,
          investigationNeeded: 1,
          chiefComplaint: 1,
          extraTreatmentAdvice: 1,
          medicinePrescribed: 1,
          createdAt: 1
        }
      },
      { $sort: { createdAt: -1 } }
    ]);
    console.log("Prescriptions:", prescriptions);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          prescriptions,
          "Prescriptions fetched successfully"
        )
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiError(500, "Server error", error.message));
  }
});
export { prescribePatient, searchPatient };
