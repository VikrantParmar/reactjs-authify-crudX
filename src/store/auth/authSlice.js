import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  updateProfile,
  fetchProfile,
  updatePassword,
} from "./authThunks"; // Import thunks

// Load user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoggedIn: !!user,
  user: user || null,
  isLoading: false,
  message: null,
  errors: null,
  updateLoading: false, // For updating profile
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.message = null; // Reset error state
      state.errors = null;
      state.isLoading = false;
      state.updateLoading = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.errors = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = action.payload;
        state.errors = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        //state.error = action.payload;
        state.message = action.payload; //?.message || null; // Handle general message
        state.errors = action.payload?.errors || null; // Handle field-specific errors
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.errors = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload?.data?.user;
        //state.message = null;
        state.message = null; //action.payload?.data?.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = action.payload;
        state.errors = action.payload?.errors || null;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.errors = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.message = null; //action.payload;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = null; //action.payload;
        state.errors = null; //action.payload?.errors || null;
      })
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.errors = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data?.user || null;
        state.message = null;
        state.errors = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
        state.errors = action.payload?.errors || null;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.updateLoading = true;
        state.message = null;
        state.errors = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.user = action.payload?.data?.user || null;
        state.message = action.payload;
        state.errors = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.message = action.payload;
        state.errors = action.payload?.errors || null;
      })

      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.updateLoading = true;
        state.message = null;
        state.errors = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.user = action.payload?.data?.user || null;
        state.message = action.payload;
        state.errors = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.updateLoading = false;
        state.message = action.payload;
        state.errors = action.payload?.errors || null;
      });
  },
});

export const { resetError, setUser } = authSlice.actions;
export { login, register, logout, fetchProfile, updateProfile, updatePassword }; // Re-export thunks
export default authSlice.reducer;
