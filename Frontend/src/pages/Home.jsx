import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api
      .get("/vehicles")
      .then((res) => {
        console.log("Fetched vehicles:", res.data);
        setVehicles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vehicles:", err);
        setVehicles([]);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-4 relative">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">JIVHALA MOTORS</h1>
        <input
          type="text"
          placeholder="Search vehicle"
          className="border p-2 rounded w-1/2 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="grid grid-cols-2 gap-2 text-center mb-4">
        <div className="bg-black text-white p-2 rounded">
          <p>Today's In</p>
          <p className="text-lg font-bold">
            {vehicles.filter((v) => v.status === "in").length}
          </p>
        </div>
        <div className="bg-black text-white p-2 rounded">
          <p>Today's Out</p>
          <p className="text-lg font-bold">
            {vehicles.filter((v) => v.status === "out").length}
          </p>
        </div>
        <div className="bg-gray-200 text-black p-2 rounded">
          <p>Date</p>
          <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="bg-gray-200 text-black p-2 rounded">
          <p>Total Vehicles</p>
          <p className="text-lg font-bold">{vehicles.length}</p>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-black text-white px-4 py-2 font-semibold grid grid-cols-2">
          <span>Vehicle Number</span>
          <span>Date</span>
        </div>

        {loading ? (
          <div className="px-4 py-2 text-center col-span-2">Loading...</div>
        ) : filteredVehicles.length === 0 ? (
          <div className="px-4 py-2 text-center col-span-2">No vehicles found.</div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="grid grid-cols-2 px-4 py-2 border-t cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/vehicle/${vehicle._id}`)}
            >
              <span>{vehicle.vehicleNumber || "N/A"}</span>
              <span>{formatDate(vehicle.insuranceDate)}</span>
            </div>
          ))
        )}
      </div>

      <button
        className="fixed bottom-20 right-6 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:bg-gray-800"
        onClick={() => navigate("/vehicle/new")}
        aria-label="Add Vehicle"
      >
        +
      </button>

      <footer className="fixed bottom-0 left-0 w-full flex justify-around bg-white p-2 border-t">
        <button className="text-black font-semibold">Home</button>
        <button
          className="text-black font-semibold"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </footer>
    </div>
  );
}
