import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notesReducer from '../features/notes/notesSlice';
import groupsReducer from '../features/groups/groupsSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    groups: groupsReducer,
    chat: chatReducer,
  },
  // Adding middleware example if you needed it for specific things
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // In case any object isn't strictly serializable in some rapid prototyping
    }),
  devTools: process.env.NODE_ENV !== 'production',
});