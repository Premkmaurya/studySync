import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchNotesApi,
  createNoteApi,
  summarizeNoteApi,
  searchNotesApi,
  getMyNotesApi,
  saveNoteApi,
  getSavedNotesApi,
  getNoteByIdApi,
} from "./notesApi";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async ({ page = 1, limit = 9 } = {}, thunkAPI) => {
    try {
      return await fetchNotesApi(page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes",
      );
    }
  },
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, thunkAPI) => {
    try {
      return await createNoteApi(noteData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create note",
      );
    }
  },
);

export const summarizeNote = createAsyncThunk(
  "notes/summarizeNote",
  async (noteId, thunkAPI) => {
    try {
      return await summarizeNoteApi(noteId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to summarize note",
      );
    }
  },
);

export const getMyNotes = createAsyncThunk(
  "notes/getMyNotes",
  async (_, thunkAPI) => {
    try {
      return await getMyNotesApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch your notes",
      );
    }
  },
);

export const getNoteById = createAsyncThunk(
  "notes/getNoteById",
  async (payload, thunkAPI) => {
    try {
      const noteId = typeof payload === "string" ? payload : payload.noteId;
      const page = payload?.page || 1;
      const limit = payload?.limit || 8;
      return await getNoteByIdApi(noteId, page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch note",
      );
    }
  },
);

export const searchNotes = createAsyncThunk(
  "notes/searchNotes",
  async ({ query, groupId, page = 1, limit = 9 }, thunkAPI) => {
    try {
      return await searchNotesApi(query, groupId, page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to search notes",
      );
    }
  },
);

export const saveNote = createAsyncThunk(
  "notes/saveNote",
  async (noteId, groupId, thunkAPI) => {
    try {
      return await saveNoteApi({ noteId, groupId });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to save note",
      );
    }
  },
);

export const getSavedNotes = createAsyncThunk(
  "notes/getSavedNotes",
  async ({ page = 1, limit = 5 } = {}, thunkAPI) => {
    try {
      return await getSavedNotesApi(page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch saved notes",
      );
    }
  },
);

const initialState = {
  notes: [],
  savedNotes: [],
  myNotes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setMyNotes: (state, action) => {
      state.myNotes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setSavedNotes: (state, action) => {
      state.savedNotes = action.payload;
    },
    clearNotesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes || action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes || action.payload;
      })
      .addCase(searchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Handle other thunks minimally
  },
});

export const {
  setNotes,
  setMyNotes,
  setSelectedNote,
  setLoading,
  clearNotesError,
  setSavedNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
