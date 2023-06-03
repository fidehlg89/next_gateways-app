'use client'

import { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Device {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: string;
}

const AddGateway = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  const handleAddDevice = () => {
    setDevices([...devices, { uid: 0, vendor: "", dateCreated: new Date(), status: "online" }]);
  };

  const handleDeviceUidChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDevices = [...devices];
    updatedDevices[index].uid = parseInt(event.target.value);
    setDevices(updatedDevices);
  };

  const handleDeviceVendorChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDevices = [...devices];
    updatedDevices[index].vendor = event.target.value;
    setDevices(updatedDevices);
  };

  const handleDeviceStatusChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedDevices = [...devices];
    updatedDevices[index].status = event.target.value;
    setDevices(updatedDevices);
  };

  const handleRemoveDevice = (index: number) => {
    const updatedDevices = [...devices];
    updatedDevices.splice(index, 1);
    setDevices(updatedDevices);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newGateway = {
      serialNumber,
      name,
      ipAddress,
      devices,
    };

    try {
      await axios.post(`${process.env.API_URL}/gateways`, newGateway, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Gateway added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to add gateway. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Add Gateway</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <div className="mb-4">
            <label className="block mb-2">
              Serial Number:
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Name:
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              IP Address:
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="mb-2 text-lg font-bold">Peripheral Devices:</h2>
          {devices.map((device, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">
                UID:
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="number"
                  value={device.uid}
                  onChange={(e) => handleDeviceUidChange(index, e)}
                />
              </label>
              <label className="block mb-2">
                Vendor:
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="text"
                  value={device.vendor}
                  onChange={(e) => handleDeviceVendorChange(index, e)}
                />
              </label>
              <label className="block mb-2">
                Date Created:
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="text"
                  value={device.dateCreated.toISOString().slice(0, 10)}
                  disabled
                />
              </label>
              <label className="block mb-2">
                Status:
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={device.status}
                  onChange={(e) => handleDeviceStatusChange(index, e)}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </label>
              <button
                className="px-2 py-1 text-sm text-red-700 bg-transparent border border-red-700 rounded"
                onClick={() => handleRemoveDevice(index)}
              >
                Remove Device
              </button>
            </div>
          ))}
          <button
            className="px-2 py-1 text-sm text-white bg-blue-700 rounded"
            onClick={handleAddDevice}
          >
            Add Device
          </button>
        </div>
        <div className="mb-4">
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
            Add Gateway
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGateway;
