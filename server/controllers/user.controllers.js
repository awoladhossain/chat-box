import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { catchAsyncErrors } from "../middleware/asyncError.middleware.js";
import User from "../models/user.model.js";
import generateToken from "../utils/jwtToken.js";

export const signup = catchAsyncErrors(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const emailRgex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRgex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    avatar: {
      public_id: "",
      url: "",
    },
  });
  generateToken(user, "User created successfully", 201, res);
});
export const signin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const emailRgex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRgex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }

  generateToken(user, "User signed in successfully", 200, res);
});
export const signout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development" ? true : false,
    })
    .json({
      success: true,
      message: "User signed out successfully",
    });
});
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
});
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { fullName, email } = req.body;
  if (fullName?.trim().length === 0 || email?.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const avatar = req?.files?.avatar;
  let cloudinaryResponse = {};
  if (avatar) {
    try {
      const oldAvatarPublicId = req.user?.avatar?.public_id;
      if (oldAvatarPublicId && oldAvatarPublicId.length > 0) {
        await cloudinary.uploader.destroy(oldAvatarPublicId);
      }
      cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {
          folder: "CHAT_APP_AVATARS",
          transformation: [
            {
              width: 300,
              height: 300,
              crop: "limit",
            },
            {
              quality: "auto",
            },
            {
              fetch_format: "auto",
            },
          ],
        }
      );
    } catch (error) {
      console.log("cloudinary upload error: ", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload avatar",
      });
    }
  }
  let data = {
    fullName,
    email,
  };
  if (
    avatar &&
    cloudinaryResponse?.public_id &&
    cloudinaryResponse?.secure_url
  ) {
    data.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).select("-password");
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});
