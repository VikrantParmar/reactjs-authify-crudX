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
    if (error?.response) {
      const { status, data } = error.response;
      const message = data?.message || error.message || "An error occurred";
      const errors = data?.errors || null; // Extract validation or additional error details

      // If the status is 401 (Unauthorized), perform specific actions
      if (status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
      return Promise.reject({ message, errors }); // Return both message and errors in the same structure
    }
    // If there's no response (network issues, etc.), return a generic message
    return Promise.reject({
      message: error.message || "Network Error",
      errors: null,
    });
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
