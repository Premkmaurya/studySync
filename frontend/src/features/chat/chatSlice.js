import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  activeGroupId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveGroup: (state, action) => {
      state.activeGroupId = action.payload;
    },
    // Useful for real-time socket events
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  }
});

export const { setActiveGroup, addMessage, setMessages, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
