import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  socket = io(
    import.meta.env.MODE === "development" ? "http://localhost:8080" : "/",
    {
      query: { userId },
    }
  );
  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
