import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api"; // Import your Axios instance

// Create the context
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("jivhala-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("jivhala-token") || null;
  });

  // Login function that calls the backend
  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      const userData = res.data.user;
      const authToken = res.data.token;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem("jivhala-user", JSON.stringify(userData));
      localStorage.setItem("jivhala-token", authToken);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jivhala-user");
    localStorage.removeItem("jivhala-token");
  };

  // Optional: Sync state with localStorage changes (multi-tab support)
  useEffect(() => {
    const syncAuth = () => {
      const savedUser = localStorage.getItem("jivhala-user");
      const savedToken = localStorage.getItem("jivhala-token");
      setUser(savedUser ? JSON.parse(savedUser) : null);
      setToken(savedToken || null);
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
