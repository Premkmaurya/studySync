import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchGroupsApi,
  createGroupApi,
  joinGroupApi,
  fetchGroupDetailsApi,
  fetchGroupMembersApi,
} from "./groupsApi";

export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async (_, thunkAPI) => {
    try {
      return await fetchGroupsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch groups",
      );
    }
  },
);

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (groupData, thunkAPI) => {
    try {
      return await createGroupApi(groupData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create group",
      );
    }
  },
);

export const joinGroup = createAsyncThunk(
  "groups/joinGroup",
  async (groupId, thunkAPI) => {
    try {
      return await joinGroupApi(groupId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to join group",
      );
    }
  },
);

export const fetchGroupMembers = createAsyncThunk(
  "groups/fetchGroupMembers",
  async (groupId, thunkAPI) => {
    try {
      return await fetchGroupMembersApi(groupId);
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch group members",
      );
    }
  },
);

export const fetchGroupDetails = createAsyncThunk(
  "groups/fetchGroupDetails",
  async (groupId, thunkAPI) => {
    try {
      return await fetchGroupDetailsApi(groupId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch group details",
      );
    }
  },
);

const initialState = {
  groups: [],
  currentGroup: null,
  members: [],
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },
    clearGroupsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.groups || action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupDetails.fulfilled, (state, action) => {
        // Assume API returns group and members inside payload
        state.currentGroup = action.payload.group || action.payload;
        state.members = action.payload.members || [];
      });
  },
});

export const { setCurrentGroup, clearGroupsError } = groupsSlice.actions;

export default groupsSlice.reducer;
