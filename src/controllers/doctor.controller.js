import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await Doctor.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error while generting Token!");
  }
};

const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, password } = req?.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Please provide all fields-name,email,password");
  }
  const existingUser = await Doctor.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }
  const user = await Doctor.create({
    name,
    email,
    password,
  });
  const createdUser = await Doctor.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Error while registering!Please try again");
  }
  res
    .status(202)
    .json(new ApiResponse(202, createdUser, "user registered Successfully"));
});
const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    throw new ApiError(401, "Please Provide both email & password!");
  }
  const userArr = await Doctor.find({ email: email });
  if (userArr.length===0) {
    throw new ApiError(404, "The user does not exists");
  }
  const user = userArr[0];
  const isValidPassword = user.checkPassword(password);
  if (!isValidPassword) {
    throw new ApiError(404, "Your password is incorrect!");
  }
  const { refreshToken, accessToken } = await generateAccessandRefreshToken(
    user._id
  );
  const logedInUser = await Doctor.findById(user._id).select(
    "-password -refreshToken"
  );
  res
    .status(202)
    .json(
      new ApiResponse(
        202,
        { user: logedInUser, refreshToken, accessToken },
        "User logged in successfully"
      )
    );
});
const completeRegister = asyncHandler(async (req, res) => {
  const { degree,regNo, specialisation,specialisation_degree, superSpecialisation,superSpecialisation_degree, otherDetails } =
    req.body;
  if (!degree || !regNo) {
    throw new ApiError(400, "Please provide the field *degree and *regNo");
  }
  const doctor = await Doctor.findByIdAndUpdate(
    req?.user?._id,
    {
      degree,
      regNo,
      specialisation,
      specialisation_degree,
      superSpecialisation,
      superSpecialisation_degree,
      otherDetails,
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");
  if (doctor?.dispensaryAddress) {
    if (doctor?.dispensaryAddress.length !== 0) {
      doctor.isCompleted = true; // set isCompleted to true
    }
  }
  await doctor.save({ validateBeforeSave: false });
  res
    .status(202)
    .json(new ApiResponse(202, doctor, "registration completed Successfully!"));
});
const addAddress = asyncHandler(async (req, res) => {
  const {
    streetName,
    dispensaryName,
    city,
    state,
    postal,
    practiceDays,
    practiceHours,
  } = req.body;
  if (!streetName || !city || !state || !postal) {
    throw new ApiError(400, "Please provide all fields");
  }
  const doctor = await Doctor.findById(req.user._id).select("-password -refreshToken");
  if (!doctor) {
    throw new ApiError(404, "User not found");
  }
  const address = {
    streetName,
    dispensaryName,
    city,
    state,
    postal,
    practiceDays,
    practiceHours,
  };
  if (!doctor.dispensaryAddress) {
    doctor.dispensaryAddress = [address];
  } else {
    doctor.dispensaryAddress.push(address);
  }
  if (doctor.degree && doctor.regNo) {
    doctor.isCompleted = true;
  }
  const updatedDoctor = await doctor.save();
  res
    .status(201)
    .json(new ApiResponse(201, updatedDoctor, "Address added successfully!"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) throw new ApiError(401, "Please send refreshToken!");
  const decodedtoken = jwt.verify(
    refreshToken,
    process.env.refreshToken_Secret
  );
  const doctor = await Doctor.findById(decodedtoken._id);
  if (!doctor) {
    throw new ApiError(404, "Invalid refreshToken");
  }
  if (refreshToken !== doctor?.refreshToken) {
    throw new ApiError(403, "RefreshToken expired!");
  }
  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await generateAccessandRefreshToken(doctor._id);
  const updatedDoctor = await Doctor.findById(doctor._id).select(
    "-password -refreshToken"
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: updatedDoctor,
          refreshToken: newRefreshToken,
          accessToken: newAccessToken,
        },
        "AccessToken refreshed and fetched Successfully!"
      )
    );
});
export { registerDoctor, loginDoctor, completeRegister, addAddress, refreshAccessToken };
