import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar = ({ showBack = false, showClose = false, title = "JIVHALA MOTORS" }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
        <span className="text-sm font-semibold">{title}</span>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-gray-700 text-lg">
            ←
          </button>
        )}

        <FaUserCircle
          onClick={() => navigate("/profile")}
          className="text-gray-700 text-2xl cursor-pointer"
        />

        {showClose && (
          <IoClose
            className="text-xl text-gray-700 cursor-pointer"
            onClick={() => navigate("/")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;