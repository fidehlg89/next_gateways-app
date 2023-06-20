"use client";

import React, { useEffect, useState } from "react";
import { Device, Gateway } from "@/src/interfaces";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@/src/shared/Modal";
import DeviceAdd from "../../DeviceAdd";
import DeviceEdit from "../../DeviceEdit";
import DevicesContainer from "../DevicesContainer";
import { IGatewayDetailsProps } from "@/src/types";
import GatewayInfo from "./GatewayInfo";
import ErrorPage from "@/src/components/Error";
import { getAllGateways } from "@/src/api/gateways.api";

const initialDevice = {
  uid: 1,
  vendor: "",
  dateCreated: new Date(),
  status: "online"
};

const GatewayDetails = ({ id }: IGatewayDetailsProps) => {
  const [gateway, setGateway] = useState<Gateway | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [newDevice, setNewDevice] = useState<Device>(initialDevice);
  const [editedDevice, setEditedDevice] = useState<Device | null>(null);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchGatewayDetails = async () => {
      try {
        const { data } = await getAllGateways();
        setGateway(data);
        setDevices(data.devices);
      } catch (error) {
        setError(
          `Failed to fetch gateways. Please check your internet connection. ${error}`
        );
        console.error("Error fetching gateway details:", error);
      }
    };

    fetchGatewayDetails();
  }, [id]);

  const handleDeviceChange = (field: keyof Device, value: string | number) => {
    setNewDevice((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSaveDevice = async () => {
    const updatedDevices = [...devices, newDevice];
    setDevices(updatedDevices);
    setShowModal(false);

    try {
      const { data, status } = await axios.put(
        `${process.env.API_URL}/gateways/${id}`,
        { devices: updatedDevices }
      );

      if (status === 200) {
        toast.success(`Device successfully updated`);

        setGateway(data);
        setDevices(data.devices);
        setEditedDevice(null);
      }
    } catch (error) {
      toast.error(`Error updating Device: ${error}`);
    }
    setEditedDevice(null);
  };

  const handleEditDevice = (index: number) => {
    const deviceToEdit = devices[index];
    setEditedDevice(deviceToEdit);
    setShowEditModal(true);
  };

  const handleUpdateDevice = async (updatedDevice: Device) => {
    const updatedDevices = [...devices];
    updatedDevices[devices.indexOf(editedDevice!)] = updatedDevice;
    setDevices(updatedDevices);
    setShowEditModal(false);

    try {
      const { data, status } = await axios.put(
        `${process.env.API_URL}/gateways/${id}`,
        { devices: updatedDevices }
      );

      if (status === 200) {
        toast.success(`Device successfully updated`);

        setGateway(data);
        setDevices(data.devices);
        setEditedDevice(null);
      }
    } catch (error) {
      toast.error(`Error updating Device: ${error}`);
    }
  };

  const handleDeleteDevice = async (index: number) => {
    try {
      let updatedDevices;
      if (gateway) {
        updatedDevices = [...gateway.devices];
        updatedDevices.splice(index, 1);
      }

      const { data, status } = await axios.put(
        `${process.env.API_URL}/gateways/${id}`,
        { devices: updatedDevices }
      );

      if (status === 200) {
        toast.success(`Device successfully updated`);

        setGateway(data);
        setDevices(data.devices);
      }
    } catch (error) {
      toast.error(`Error deleting Device: ${error}`);
    }
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="max-w-xl">
      <ToastContainer />
      {gateway && <GatewayInfo gateway={gateway} />}

      <div className="mb-5">
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
            onRemove={handleDeleteDevice}
            onEdit={handleEditDevice}
          />
        ) : (
          <p className="text-red-700">{`There is not a new Devices added yet, you can add at least 10 Devices per Gateway`}</p>
        )}
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <DeviceAdd
          newDevice={newDevice}
          onDeviceChange={handleDeviceChange}
          onSaveDevice={handleSaveDevice}
        />
      </Modal>
      {editedDevice && (
        <Modal
          isVisible={showEditModal}
          onClose={() => setShowEditModal(false)}
        >
          <DeviceEdit
            device={editedDevice}
            onUpdateDevice={handleUpdateDevice}
          />
        </Modal>
      )}
    </div>
  );
};

export default GatewayDetails;
