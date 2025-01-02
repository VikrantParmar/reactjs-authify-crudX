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

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
