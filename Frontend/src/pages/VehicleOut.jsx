import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function VehicleOut() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyerPhoto, setBuyerPhoto] = useState(null);
  const [buyerData, setBuyerData] = useState({
    name: "",
    address: "",
    price: "",
    rtoCharges: "",
    commission: "",
    token: "",
    receivedPrice: "",
    balance: "",
    challan: "",
    idProof: false,
    aadhar: "",
    pan: "",
    mail: "",
    outDate: "",
  });

  // Fetch vehicle info
  useEffect(() => {
    api.get(`/vehicles/${id}`)
      .then(res => {
        setVehicle(res.data);
        setLoading(false);
      })
      .catch(() => {
        setVehicle(null);
        setLoading(false);
      });
  }, [id]);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBuyerPhoto(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBuyerData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  // Send all buyer data as a single object
  formData.append("outInfo", JSON.stringify(buyerData));
  if (buyerPhoto) {
    formData.append("buyerPhoto", buyerPhoto);
  }
  try {
    await api.post(`/vehicles/${id}/out`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Buyer info saved!");
    navigate("/home");
  } catch (err) {
    alert("Failed to save buyer info.");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <span>Loading...</span>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <span>Vehicle not found.</span>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F4F4] min-h-screen p-2 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-sm font-semibold">
            In: {vehicle.inDate ? new Date(vehicle.inDate).toLocaleDateString() : ""}
          </h2>
        </div>
        <button className="text-gray-600 text-2xl font-bold" onClick={() => navigate(-1)}>✕</button>
      </div>

      {/* Vehicle Information */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow">
        <h3 className="font-semibold mb-2">Vehicle Information</h3>
        <div className="text-sm space-y-1">
          <div>Vehicle Number : <span className="font-medium">{vehicle.number}</span></div>
          <div>Vehicle HP : {vehicle.hp}</div>
          <div>Chassis Number : {vehicle.chassisNo}</div>
          <div>Engine Number : {vehicle.engineNo}</div>
          <div>Vehicle Name : <span className="font-medium">{vehicle.name}</span></div>
          <div>Model : <span className="font-medium">{vehicle.model}</span></div>
          <div>Owner Name : <span className="font-medium">{vehicle.ownerName}</span></div>
          <div>Mobile Number : {vehicle.mobileNo}</div>
          <div>Insurance Date : {vehicle.insuranceDate ? new Date(vehicle.insuranceDate).toLocaleDateString() : ""}</div>
          <div>Challan : {vehicle.challan}</div>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={vehicle.rc || false} readOnly /> RC
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={vehicle.puc || false} readOnly /> PUC
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={vehicle.noc || false} readOnly /> NOC
            </label>
          </div>
        </div>
      </div>

      {/* Buyer Information */}
      <form className="bg-white rounded-xl p-4 mb-4 shadow" onSubmit={handleSubmit}>
        <h3 className="font-semibold mb-2">Buyer Information</h3>
        <div className="text-sm space-y-2">
          <div className="flex items-center">
            <span className="w-32">Buyer's Name</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="name" value={buyerData.name} onChange={handleChange} placeholder="Enter buyer name" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Address</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="address" value={buyerData.address} onChange={handleChange} placeholder="Enter address" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Price</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="price" value={buyerData.price} onChange={handleChange} placeholder="Enter price" />
          </div>
          <div className="flex items-center">
            <span className="w-32">RTO Charges</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="rtoCharges" value={buyerData.rtoCharges} onChange={handleChange} placeholder="Enter RTO charges" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Commission</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="commission" value={buyerData.commission} onChange={handleChange} placeholder="Enter commission" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Token</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="token" value={buyerData.token} onChange={handleChange} placeholder="Enter token amount" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Received Price</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="receivedPrice" value={buyerData.receivedPrice} onChange={handleChange} placeholder="Enter received amount" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Balance</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="balance" value={buyerData.balance} onChange={handleChange} placeholder="Enter balance amount" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Challan</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="challan" value={buyerData.challan} onChange={handleChange} placeholder="Enter challan details" />
          </div>
          <div className="flex items-center">
            <span className="w-32">ID Proof/Address Proof</span>
            <span className="mx-2">:</span>
            <input type="checkbox" name="idProof" checked={buyerData.idProof} onChange={handleChange} className="mr-2" /> Verified
          </div>
          <div className="flex items-center">
            <span className="w-32">Aadhar Card</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="aadhar" value={buyerData.aadhar} onChange={handleChange} placeholder="Enter Aadhar number" />
          </div>
          <div className="flex items-center">
            <span className="w-32">PAN Card</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="pan" value={buyerData.pan} onChange={handleChange} placeholder="Enter PAN number" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Mail ID</span>
            <span className="mx-2">:</span>
            <input className="flex-1 border-b outline-none" name="mail" value={buyerData.mail} onChange={handleChange} placeholder="Enter email address" />
          </div>
          <div className="flex items-center">
            <span className="w-32">Out Date</span>
            <span className="mx-2">:</span>
            <input type="date" className="flex-1 border-b outline-none" name="outDate" value={buyerData.outDate} onChange={handleChange} />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-[#1C1C1E] text-white text-sm py-2 rounded-xl"
        >
          Save Buyer Info
        </button>
      </form>

      {/* Buyer Photo Upload */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow flex flex-col items-center">
        <label className="flex flex-col items-center cursor-pointer">
          {buyerPhoto ? (
            <img
              src={URL.createObjectURL(buyerPhoto)}
              alt="Buyer"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <span className="text-4xl text-gray-400 mb-2">📷</span>
          )}
          <span className="text-gray-500 text-sm">Add buyer photo</span>
          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </label>
      </div>
    </div>
  );
}