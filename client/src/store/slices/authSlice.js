import { axiosInstance } from "@/lib/axios";
// import { connectSocket, disconnectSocket } from "@/lib/socket";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/users/get-user");
    // if (res.data.user) {
    //   // Guard: Only connect if user exists
    //   connectSocket(res.data.user._id); // Pass _id (string)
    // }
    return res.data.user;
  } catch (error) {
    console.log("error while fatching user: ", error);
    return thunkAPI.rejectWithValue(
      error.response?.data || "Something went wrong"
    );
  }
});

export const logoutUser = createAsyncThunk(
  "user/sign-out",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.get("/users/sign-out");
      // disconnectSocket();
      return null;
    } catch (error) {
      console.log(error);
      console.error(error.response?.data.message);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/sign-in",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/users/sign-in", data);
      // console.log(res?.data.user._id);
      // connectSocket(res?.data.user._id);
      toast.success("Login successful");
      return res.data.user;
    } catch (error) {
      console.log(error);
      console.error(error.response?.data.message);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "users/sign-up",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/users/sign-up", data);
      // connectSocket(res?.data.user._id);
      // toast.success("Registration successful");
      return res.data.user;
    } catch (error) {
      console.log(error);
      console.error(error.response?.data.message);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

const initialState = {
  authUser: null,
  loading: false,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isCheckingAuth = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggingIn = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isSigningUp = false;
        toast.error(action.payload || "Registration failed");
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
