"use client";

import React, { useState } from "react";
import { Device } from "@/src/interfaces";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@/src/shared/Modal";
import AddDevice from "../DeviceAdd";
import EditDevice from "../DeviceEdit";
import DevicesContainer from "../containers/DevicesContainer";

const GatewayCreate = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  const [newDevice, setNewDevice] = useState<Device>({
    uid: 1,
    vendor: "",
    dateCreated: new Date(),
    status: ""
  });

  const [editedDevice, setEditedDevice] = useState<Device | null>(null);

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

  const [showModal, setShowModal] = useState(false);

  const handleSaveDevice = () => {
    const updatedDevices = [...devices, newDevice];
    setDevices(updatedDevices);
    setShowModal(false);
    setNewDevice({
      uid: 0,
      vendor: "",
      dateCreated: new Date(),
      status: "online"
    });
  };

  const handleEditDevice = (index: number) => {
    const deviceToEdit = devices[index];
    setEditedDevice(deviceToEdit);
    setShowModal(true);
  };

  const handleUpdateDevice = (updatedDevice: Device) => {
    const updatedDevices = [...devices];
    updatedDevices[devices.indexOf(editedDevice!)] = updatedDevice;
    setDevices(updatedDevices);
    setShowModal(false);
    setEditedDevice(null);
  };

  const handleDeviceChange = (field: keyof Device, value: string | number) => {
    setNewDevice((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <h1 className="mb-4 text-2xl font-bold">Add Gateway</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-4">
        <div className="col-span-2 mb-5">
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
        <div className="col-span-3 mb-5">
          <button
            className="px-2 py-1 mt-2 text-sm text-white bg-blue-700 rounded"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add Device
          </button>
          {devices.length > 0 ? (
            <DevicesContainer
              devices={devices}
              onRemove={handleRemoveDevice}
              onEdit={handleEditDevice}
            />
          ) : (
            <p className="text-red-700">{`There is not a new Devices added yet, you can add at least 10 Devices per Gateway`}</p>
          )}
        </div>
        <div className="col-span-2 mb-5">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            type="submit"
          >
            Save Gateway
          </button>
        </div>
      </form>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <AddDevice
          newDevice={newDevice}
          onDeviceChange={handleDeviceChange}
          onSaveDevice={handleSaveDevice}
        />
      </Modal>
      {editedDevice && (
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <EditDevice
            device={editedDevice}
            onUpdateDevice={handleUpdateDevice}
          />
        </Modal>
      )}
    </div>
  );
};

export default GatewayCreate;
