import { Server } from "socket.io";

const userSocketMap = {};

let io;
export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173", // ✅ Fix this
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // ✅ Add OPTIONS
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected to the server:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(`📍 User ${userId} mapped to socket ${socket.id}`);
      console.log("📊 Current online users:", Object.keys(userSocketMap));
    }

    // Emit online users to ALL clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      delete userSocketMap[userId];
      console.log("📊 Remaining online users:", Object.keys(userSocketMap));
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

export function getReceiverSocket(receiverId) {
  return userSocketMap[receiverId];
}

export { io };
