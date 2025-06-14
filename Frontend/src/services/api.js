import axios from "axios";

// Base URL (change this if deploying to production)
const BASE_URL = "http://localhost:5000/api"; // Replace with production URL if needed

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jivhala-token"); // <-- Use the correct key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Redirecting to login...");
      // You can redirect user to login page if needed
      // e.g., window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;