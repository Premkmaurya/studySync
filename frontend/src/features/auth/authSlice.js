import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi, fetchCurrentApi, logoutApi, updateProfilePictureApi, updateUserProfileApi } from './authApi';

// Thunks
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const data = await registerApi(userData);
      return data;
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue('Unable to connect to the server. Please try again.');
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const data = await loginApi(credentials);
      return data;
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue('Unable to connect to the server. Please try again.');
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Invalid email or password');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const data = await fetchCurrentApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await logoutApi();
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to logout');
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  'auth/updateProfilePicture',
  async ({ id, profilePicture }, thunkAPI) => {
    try {
      const data = await updateProfilePictureApi({ id, profilePicture });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update profile picture');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData, thunkAPI) => {
    try {
      const data = await updateUserProfileApi(profileData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isInitializing: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // We can manually set the user if reading from local storage on app load
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isInitializing = false;
        state.user = action.payload.user || action.payload; // Handle depending on backend shape
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isInitializing = false;
        // Assuming backend returns { user, token } or similar
        state.user = action.payload.user || action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.isInitializing = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isInitializing = false;
        state.user = action.payload.user || action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isInitializing = false;
        state.user = null;
        state.error = null;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isInitializing = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Even if the backend fails, we usually want to clear the local state
        state.loading = false;
        state.isInitializing = false;
        state.user = null;
        state.error = action.payload;
      })
      
      // Update Profile Picture
      .addCase(updateProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile Details (Name)
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;

export default authSlice.reducer;
