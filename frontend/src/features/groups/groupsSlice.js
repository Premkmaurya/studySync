import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchGroupsApi,
  createGroupApi,
  joinGroupApi,
  fetchGroupMembersApi,
  joinedGroupApi,
  deleteGroupApi,
  updateGroupApi,
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

export const joinedGroup = createAsyncThunk(
  "groups/joinedGroup",
  async (_, thunkAPI) => {
    try {
      return await joinedGroupApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch joined groups",
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
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch group members",
      );
    }
  },
);

export const updateGroup = createAsyncThunk(
  "groups/updateGroup",
  async ({ groupId, groupData }, thunkAPI) => {
    try {
      return await updateGroupApi(groupId, groupData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update group",
      );
    }
  },
);

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (groupId, thunkAPI) => {
    try {
      return await deleteGroupApi(groupId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete group",
      );
    }
  },
);

const initialState = {
  groups: [],
  joinedGroups: [],
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
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
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both response formats: { group: {...} } or just {...}
        const updatedGroup = action.payload.group || action.payload;
        if (updatedGroup && updatedGroup._id) {
          const index = state.groups.findIndex(g => g._id === updatedGroup._id);
          if (index !== -1) {
            state.groups[index] = updatedGroup;
          }
          // Also update in joinedGroups if present
          const joinedIndex = state.joinedGroups.findIndex(g => g._id === updatedGroup._id);
          if (joinedIndex !== -1) {
            state.joinedGroups[joinedIndex] = updatedGroup;
          }
        }
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally remove the deleted group from state
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setJoinedGroups, clearGroupsError,setGroups } = groupsSlice.actions;

export default groupsSlice.reducer;
