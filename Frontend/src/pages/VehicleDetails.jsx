import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import jsPDF from "jspdf";

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(id === "new" ? {} : null);
  const [loading, setLoading] = useState(id !== "new");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id === "new") return;

    api
      .get(`/vehicles/${id}`)
      .then((res) => {
        setVehicle(res.data);
        setLoading(false);
      })
      .catch(() => {
        setVehicle(null);
        setLoading(false);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "vehicleNumber",
      "chassisNumber",
      "engineNumber",
      "model",
      "ownerName",
      "mobileNumber",
    ];
    for (let field of requiredFields) {
      if (!vehicle[field]) {
        const label = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        alert(`Please enter ${label}`);
        return;
      }
    }

    try {
      const formData = new FormData();
      Object.entries(vehicle).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });
      images.forEach((img) => {
        formData.append("images", img);
      });

      await api.post("/vehicles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/");
    } catch (err) {
      alert("Error adding vehicle");
    }
  };

  const handleVehicleOut = () => {
    navigate(`/buyers/out/${id}`);
  };

  const handleGeneratePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Vehicle Details", 20, 20);

  const details = [
    ["Vehicle Number", vehicle.vehicleNumber],
    ["HP", vehicle.hp],
    ["Chassis Number", vehicle.chassisNumber],
    ["Engine Number", vehicle.engineNumber],
    ["Model", vehicle.model],
    ["Owner Name", vehicle.ownerName],
    ["Mobile Number", vehicle.mobileNumber],
    ["Insurance Date", vehicle.insuranceDate],
    ["RC", vehicle.rc ? "Yes" : "No"],
    ["PUC", vehicle.puc ? "Yes" : "No"],
    ["NOC", vehicle.noc ? "Yes" : "No"],
  ];

  details.forEach(([label, value], idx) => {
    doc.setFontSize(12);
    doc.text(`${label}: ${value || ""}`, 20, 30 + idx * 10);
  });

  doc.save(`vehicle-${vehicle.vehicleNumber || id}.pdf`);
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <span>Loading...</span>
      </div>
    );
  }

  if (!vehicle && id !== "new") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <span>Vehicle not found.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <h2 className="text-sm font-semibold">
            {vehicle.insuranceDate
              ? new Date(vehicle.insuranceDate).toLocaleDateString()
              : "New Vehicle"}
          </h2>
        </div>
        <button
          className="text-gray-600 text-xl font-bold"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>
      </div>

      {/* Vehicle Form */}
      <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
        {/* Show all fields, disabled if not new */}
        {[
          { label: "Vehicle Number", key: "vehicleNumber" },
          { label: "Vehicle HP", key: "hp" },
          { label: "Chassis Number", key: "chassisNumber" },
          { label: "Engine Number", key: "engineNumber" },
          { label: "Model", key: "model" },
          { label: "Owner Name", key: "ownerName" },
          { label: "Mobile Number", key: "mobileNumber" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block text-xs text-gray-600 mb-1">{label}</label>
            <input
              type="text"
              value={vehicle[key] || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
              disabled={id !== "new"}
              onChange={(e) =>
                setVehicle((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          </div>
        ))}

        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Insurance Date
          </label>
          <input
            type="date"
            value={
              vehicle.insuranceDate ? vehicle.insuranceDate.slice(0, 10) : ""
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
            disabled={id !== "new"}
            onChange={(e) =>
              setVehicle((prev) => ({ ...prev, insuranceDate: e.target.value }))
            }
          />
        </div>

        {/* RC, PUC, NOC checkboxes */}
        <div className="flex gap-4 items-center text-sm text-gray-600">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={vehicle.rc || false}
              onChange={(e) =>
                setVehicle((prev) => ({ ...prev, rc: e.target.checked }))
              }
              disabled={id !== "new"}
            />
            RC
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={vehicle.puc || false}
              onChange={(e) =>
                setVehicle((prev) => ({ ...prev, puc: e.target.checked }))
              }
              disabled={id !== "new"}
            />
            PUC
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={vehicle.noc || false}
              onChange={(e) =>
                setVehicle((prev) => ({ ...prev, noc: e.target.checked }))
              }
              disabled={id !== "new"}
            />
            NOC
          </label>
        </div>

        {/* Image Upload */}
        {id === "new" && (
          <>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex items-center justify-center text-gray-400 text-sm cursor-pointer"
              onClick={() => document.getElementById("imageInput").click()}
            >
              <span>📷 Click to upload photos</span>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageChange}
              />
            </div>

            {images.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Show images for existing vehicles */}
        {id !== "new" && vehicle.images && vehicle.images.length > 0 && (
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {vehicle.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="vehicle"
                className="h-20 w-20 object-cover rounded"
              />
            ))}
          </div>
        )}

        {/* Submit Button for new vehicle */}
        {id === "new" && (
          <button
            className="w-full mt-4 bg-[#1C1C1E] text-white text-sm py-2 rounded-xl"
            onClick={handleSubmit}
          >
            Vehicle In
          </button>
        )}

        {/* Vehicle Out and Generate PDF buttons for existing vehicles */}
        {id !== "new" && (
          <div className="flex gap-4 mt-4">
            <button
              className="w-full bg-black text-white py-2 rounded-lg font-semibold"
              onClick={handleVehicleOut}
            >
              Vehicle Out
            </button>
            <button
              className="w-full bg-gray-200 text-black py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
              onClick={handleGeneratePDF}
            >
              <span className="material-icons"></span>
              Generate PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
