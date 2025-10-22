import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./components/ui/button";
import { Spinner } from "./components/ui/spinner";
import { connectSocket, disconnectSocket } from "./lib/socket";
import { getUser, setOnlineUsers } from "./store/slices/authSlice";

const App = () => {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    if (authUser) {
      const socket = connectSocket(authUser._id);
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        disconnectSocket();
      };
    }
  }, [authUser, dispatch]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-10" />
      </div>
    );
  }
  return (
    <div>
      <h1>hello bhai</h1>
      <Button>Click me</Button>
    </div>
  );
};

export default App;
