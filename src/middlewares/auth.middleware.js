import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    console.log(jwt.decode(token));

    console.log("Secret Key:", process.env.ACCESS_TOKEN_SECRET);
    // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decoded) {
        if (err) {
          console.log(err);
        } else {
          console.log(decoded);
        }
      }
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
