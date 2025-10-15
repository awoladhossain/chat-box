import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { catchAsyncErrors } from "./asyncError.middleware.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRT_KEY);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }

  // * this id is user id when we create token with user id in the payload in jwtToken.js file
  const user = await User.findById(decoded.id);
  req.user = user;
  next();
});
