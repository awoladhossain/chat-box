import { Server } from "socket.io";

const userSocketMap = {};

let io;
export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL],
      credentials: true,
      allowedHeaders:['Content-Type', 'Authorization'],
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  io.on("connection", (socket) => {
    console.log("user connected to the server: ", socket.id);
    const userId = socket.handshake.query.userId; //* this will be the id of the user whiich will be comes from the client
    if (userId) {
      userSocketMap[userId] = socket.id;
    }
    // * emit means
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.io);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

export function getReceiverSocket(receiverId) {
  return userSocketMap[receiverId];
}

export { io };
