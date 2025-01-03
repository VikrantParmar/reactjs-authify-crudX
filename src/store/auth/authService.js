//import axios from "axios";
import axiosServices from "@/utils/axios";

const register = (data) => {
  return axiosServices.post("register", data);
};

const login = (email, password) => {
  return axiosServices.post("login", { email, password });
};

const logout = () => {
  return axiosServices.post("logout");
};

const fetchProfile = () => {
  return axiosServices.get("profile");
};

const updateProfile = (data) => {
  return axiosServices.post("profile", data);
};

const updatePassword = (data) => {
  return axiosServices.post("update-password", data);
};

const AuthService = {
  register,
  login,
  logout,
  fetchProfile,
  updateProfile,
  updatePassword,
};

export default AuthService;
