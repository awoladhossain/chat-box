import jwt from "jsonwebtoken";

const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE || "7d", // Fallback if env missing
  });
  const options = {
    httpOnly: true,
    maxAge: (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000, // Fallback to 7 days
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // More flexible in dev
    secure: process.env.NODE_ENV === "production", // Simplified
  };
  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message,
      // token, // Optional: Remove if frontend uses cookies only
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        // Add other safe fields; exclude sensitive ones
      },
    });
};

export default generateToken;
