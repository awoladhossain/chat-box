import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/baseComponents/Navbar";
import { Spinner } from "./components/ui/spinner";
import { connectSocket, disconnectSocket } from "./lib/socket";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
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
        console.log("Online users received:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        disconnectSocket();
      };
    } else {
      disconnectSocket();
    }
  }, [authUser, dispatch]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
