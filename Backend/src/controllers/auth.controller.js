import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiErrors.js";
import {User }from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";


const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.refreshAccessToken();
    user.refreshToken = refreshToken;
    // console.log("this is refrehToken==",refrenshToken)
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new apiError(
      500,
      "something went wrong when generating access and refresh token",
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username,email, password } = req.body;
  if (
    [username,email, password].some((field) => field?.trim() === "")
  ) {
    throw apiError(400, "All fields are requried");
  }
  const existedUser = User.findOne({ $or: [{ username },{email}] });
  if (!existedUser) {
    throw new apiError(409, "User should have unique details");
  }
  const user = await User.create({
    username: username?.toLowerCase(),
    email: email?.toLowerCase(),
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken",
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong ,try after some time!");
  }
  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username&& !password)
    throw new apiError(400, "Valid information not found");

  const user = await User.findOne({
    $or: [{ username }],
  });

  if (!user) throw new apiError(400, "User not found");
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new apiError(400, "Password is not correct");
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);
  // console.log("this is refrehToken==",refreshToken)
  const loggedInUser = await User.findById(user._id).select(
    "-password -refrenshToken",
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new apiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "User logged In successfully",
      ),
    );
});
const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new apiResponse(200, {}, "user Logged-Out successfully "));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new apiError(400, "Unauthorized details");
  try {
    const decodeToken = await jwt.verify(
      incomingRefreshToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    const user = User.findById(decodeToken._id);
    if (!user) throw new apiError(401, "user not found");
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(401, "Refresh token is expired or used");
    }
    const option = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refeshToken", newRefreshToken, option)
      .json(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "refreshToken updatede successfully",
      );
  } catch (err) {
    throw new apiError(401, "Something is wrong");
  }
});



export {
  loginUser,
  registerUser,
  logOutUser,
  refreshAccessToken
};
