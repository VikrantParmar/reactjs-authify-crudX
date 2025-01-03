import axios from "axios";
const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:3000/",
  headers: {
    "Accept-Language": "en", // en | fr | de - Correctly setting the language in headers
  },
});

axiosServices.interceptors.request.use(
  async (config) => {
    let jwtToken = getJwtToken();
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response && error?.response?.status === 401) {
      // Handle unauthorized error (e.g., token expired)
      //localStorage.removeItem("token");
      // Optionally, redirect to login page or notify the user
      localStorage.clear();
      sessionStorage.clear();
      if (window.location.pathname !== "/login") {
        // Redirect to the login page if not already there
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Get JWT token from storage
function getJwtToken() {
  const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
  if (rememberMe) {
    return localStorage.getItem("token");
  } else {
    return sessionStorage.getItem("token");
  }
}
// Set JWT token in storage
axiosServices.setJwtToken = function (token, rememberMe = true) {
  localStorage.setItem("rememberMe", rememberMe);
  if (rememberMe) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

// Set user in storage
axiosServices.setUser = function (user, rememberMe = true) {
  const encryptedUser = user; // encryptData(user);
  if (rememberMe) {
    localStorage.setItem("user", encryptedUser);
  } else {
    sessionStorage.setItem("user", encryptedUser);
  }
};

export default axiosServices;
