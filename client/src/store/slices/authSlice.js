import { axiosInstance } from "@/lib/axios";
import { connectSocket } from "@/lib/socket";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/user/getUser");
    connectSocket(res.data.user);
    return res.data.user;
  } catch (error) {
    console.log("error while fatching user: ", error);
    return thunkAPI.rejectWithValue(
      error.response?.data || "Something went wrong"
    );
  }
});

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
      .addCase(getUser.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
