import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getUsers = createAsyncThunk(
  "chat/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/messages/users");
      return res.data.users;
    } catch (error) {
      toast.error(error.response?.data.message);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  },
);
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/messages/user-messages/${userId}`);
      return res.data.messages;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  },
);

const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    pushNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.isMessagesLoading = false;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      });
  },
});

export const { setSelectedUser, pushNewMessage } = chatSlice.actions;
export default chatSlice.reducer;
