import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./authService"; // AuthService for API calls
import axiosServices from "@/utils/axios";
// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(email, password);
      axiosServices.setJwtToken(response?.data?.data?.token);
      axiosServices.setUser(JSON.stringify(response.data?.data?.user));
      //localStorage.setItem("user", JSON.stringify(response.data?.data?.user));
      //localStorage.setItem("token", response?.data?.data?.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  //await AuthService.logout();

  localStorage.clear();
  sessionStorage.clear();
  return true;
});

// Fetch profile data
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.fetchProfile();
      axiosServices.setUser(JSON.stringify(response.data?.data?.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update profile data
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await AuthService.updateProfile(profileData);
      axiosServices.setUser(JSON.stringify(response.data?.data?.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.updatePassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
