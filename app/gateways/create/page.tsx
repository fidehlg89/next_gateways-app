"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "@/src/components/layout";
import DevicesList from "@/src/components/containers/DevicesList";
import { Device } from "@/src/interfaces";

const AddGateway = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    setDevices([
      ...devices,
      { uid: 0, vendor: "", dateCreated: new Date(), status: "online" }
    ]);
  };

  const handleDeviceChange = (
    index: number,
    field: keyof Device,
    value: string | number
  ) => {
    const updatedDevices: Device[] = [...devices];
    updatedDevices[index][field] = value as keyof Device extends never ? string : never;
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
      devices
    };

    try {
      await axios.post(`${process.env.API_URL}/gateways`, newGateway, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Gateway added successfully!");
    } catch (error) {
      toast.error("Failed to add gateway. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Add Gateway</h1>
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
            <DevicesList
              devices={devices}
              onAddDevice={handleAddDevice}
              onDeviceChange={handleDeviceChange}
              onRemoveDevice={handleRemoveDevice}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded"
            >
              Save Gateway
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddGateway;

