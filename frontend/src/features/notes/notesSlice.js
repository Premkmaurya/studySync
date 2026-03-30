import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotesApi, createNoteApi, summarizeNoteApi, searchNotesApi, getMyNotesApi, saveNoteApi, getSavedNotesApi } from './notesApi';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, thunkAPI) => {
  try {
    return await fetchNotesApi();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch notes');
  }
});

export const createNote = createAsyncThunk('notes/createNote', async (noteData, thunkAPI) => {
  try {
    return await createNoteApi(noteData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create note');
  }
});

export const summarizeNote = createAsyncThunk('notes/summarizeNote', async (noteId, thunkAPI) => {
  try {
    return await summarizeNoteApi(noteId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to summarize note');
  }
});

export const getMyNotes = createAsyncThunk('notes/getMyNotes', async (_, thunkAPI) => {
  try {
    return await getMyNotesApi();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch your notes');
  }
});

export const searchNotes = createAsyncThunk('notes/searchNotes', async (query, thunkAPI) => {
  try {
    return await searchNotesApi(query);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to search notes');
  }
});

export const saveNote = createAsyncThunk('notes/saveNote', async (noteId, thunkAPI) => {
  try {
    return await saveNoteApi(noteId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to save note');
  }
});

export const getSavedNotes = createAsyncThunk('notes/getSavedNotes', async (_, thunkAPI) => {
  try {
    return await getSavedNotesApi();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch saved notes');
  }
});

const initialState = {
  notes: [],
  savedNotes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setLoading:(state,action) =>{
      state.loading = action.payload;
      state.error = null;
    },
    setSavedNotes:(state,action) =>{
      state.savedNotes = action.payload;
    },
    clearNotesError: (state) => {
      state.error = null;
    }
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
      });
      // Handle other thunks minimally
  }
});

export const { setSelectedNote,setLoading, clearNotesError,setSavedNotes } = notesSlice.actions;

export default notesSlice.reducer;
