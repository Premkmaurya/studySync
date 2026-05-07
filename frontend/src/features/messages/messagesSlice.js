import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMessagesApi } from "./messageApi";


export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ groupId} = {}, thunkAPI) => {
    try {
      return await fetchMessagesApi(groupId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);


const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, removeMessage, clearMessages } = messagesSlice.actions;

export default messagesSlice.reducer;