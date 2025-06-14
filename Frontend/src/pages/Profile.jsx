import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(authUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile from backend
    api.get("/auth/profile")
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(authUser); // fallback to auth context user
        setLoading(false);
      });
  }, [authUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          <h1 className="text-xl font-bold">Jivhala Motors</h1>
        </div>
        <button
          className="text-3xl text-gray-500"
          onClick={() => navigate(-1)}
        >
          &#10005;
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/avatar.png"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
        />
      </div>

      {/* Profile Form */}
      <form className="bg-white rounded-2xl shadow p-6 w-full max-w-md flex flex-col gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            className="w-full bg-gray-200 rounded-lg px-4 py-2"
            value={user?.name || ""}
            disabled
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            className="w-full bg-gray-200 rounded-lg px-4 py-2"
            value={user?.username || ""}
            disabled
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full bg-gray-200 rounded-lg px-4 py-2 pr-10"
              value="........."
              disabled
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              <svg width="24" height="24" fill="none"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" stroke="#9CA3AF" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#9CA3AF" strokeWidth="2"/></svg>
            </span>
          </div>
        </div>
        <button
          type="button"
          className="w-full bg-gray-300 text-black font-bold py-2 rounded-lg"
          disabled
        >
          UPDATE
        </button>
      </form>

      <button
        className="w-full max-w-md bg-red-100 text-red-600 font-bold py-2 rounded-lg"
        onClick={logout}
      >
        LOGOUT
      </button>
    </div>
  );
}