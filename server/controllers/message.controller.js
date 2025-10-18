import { v2 as cloudinary } from "cloudinary";
import { catchAsyncErrors } from "../middleware/asyncError.middleware.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocket, io } from "../utils/socket.js";

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const filteredUser = await User.find({ _id: { $ne: user } }).select(
    "-password"
  );
  res.status(200).json({
    success: true,
    users: filteredUser,
  });
});
export const getMessages = catchAsyncErrors(async (req, res, next) => {
  const receiverId = req.params.id; // * this id of that user which i will send message
  const myId = req.user._id; // * this is my id
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: receiverId },
      { senderId: receiverId, receiverId: myId },
    ],
  }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    messages,
  });
});
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { text } = req.body;
  const media = req?.file?.media;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({
      success: false,
      message: "Receiver ID not found",
    });
  }
  const sanitizedText = text?.trim() || "";
  if (!sanitizedText && !media) {
    return res.status(400).json({
      success: false,
      message: "Message or media is required",
    });
  }
  let mediaUrl = "";
  if (media) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(
        media.tempFilePath,
        {
          resource_type: "auto", //* resource_type: video, image, raw, auto
          folder: "CHAT_APP_MEDIA",
          transformation: [
            {
              width: 1080,
              heigth: 1080,
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
      mediaUrl = uploadResponse?.secure_url;
    } catch (error) {
      console.log("Error while uploading media from message");
      return res.status(500).json({
        success: false,
        message: "Error while uploading media from message",
      });
    }
  }
  const newMessage = await Message.create({
    senderId,
    receiverId,
    text: sanitizedText,
    media: mediaUrl,
  });
  const receiverSocketId = getReceiverSocket(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  res.status(201).json({
    success: true,
    message: newMessage,
  });
});
