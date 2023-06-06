"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Gateway, Device } from "@/src/interfaces";
import { ToastContainer, toast } from "react-toastify";
import DevicesInfo from "../DevicesInfo";
import AddDevice from "./AddDevice";

export type GatewayDetailsProps = {
  id: string;
};

const GatewayDetails = ({ id }: GatewayDetailsProps) => {
  const [gateway, setGateway] = useState<Gateway | null>(null);

  const [showAddDevice, setShowAddDevice] = useState(false);

  const handleAddDevice = () => {
    setShowAddDevice(true);
  };

  const handleSaveNewDevice = async (newDevice: Device) => {
    try {
      if (gateway) {
        const updatedDevices = [...gateway.devices, newDevice];

        const { data } = await axios.put(
          `${process.env.API_URL}/gateways/${id}`,
          { devices: updatedDevices }
        );

        if (data.status === 200) {
          toast.error(`Device successfully added`);
        }

        setGateway(data);

        setShowAddDevice(false);
      }
    } catch (error) {
      toast.error(`Error adding new device`);
      console.log(error);
    }
  };

  const handleCancelAddDevice = () => {
    setNewDevice({
      uid: 0,
      vendor: "",
      status: ""
    });
    setShowAddDevice(false);
  };

  useEffect(() => {
    const fetchGatewayDetails = async () => {
      try {
        const { data } = await axios.get<Gateway>(
          `${process.env.API_URL}/gateways/${id}`
        );
        setGateway(data);
      } catch (error) {
        console.error("Error fetching gateway details:", error);
      }
    };

    fetchGatewayDetails();
  }, [id]);

  const handleDeleteDevice = async (index: number) => {
    try {
      let updatedDevices;
      if (gateway) {
        updatedDevices = [...gateway.devices];
        updatedDevices.splice(index, 1);
      }

      const { data } = await axios.put(
        `${process.env.API_URL}/gateways/${id}`,
        { devices: updatedDevices }
      );

      if (data.status === 200) {
        toast.error(`Device successfully updated`);
      }

      setGateway(data);
    } catch (error) {
      toast.error(`Error deleting Device: ${error}`);
    }
  };

  const handleEditDevice = async (index: number, device: Device) => {
    try {
      if (gateway) {
        const updatedDevices = [...gateway.devices];

        if (index >= 0 && index < updatedDevices.length) {
          updatedDevices[index] = device;
        }
        const { data } = await axios.put(
          `${process.env.API_URL}/gateways/${id}`,
          { devices: updatedDevices }
        );

        if (data.status === 200) {
          toast.error(`Device successfully updated`);
        }

        setGateway(data);
      }
    } catch (error) {
      toast.error(`Error updating Device: ${error}`);
    }
  };

  return (
    <>
      {gateway && (
        <div className="max-w-xl mx-auto">
          <ToastContainer />
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Gateway Information
            </h3>
            <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">
              Gateway details
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Serial Number:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {gateway.serialNumber}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Name:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {gateway.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  IP Address:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {gateway.ipAddress}
                </dd>
              </div>
            </dl>
          </div>
          <DevicesInfo
            devices={gateway.devices}
            onDelete={handleDeleteDevice}
            onEdit={handleEditDevice}
          />
          {showAddDevice ? (
            <AddDevice
              onSave={handleSaveNewDevice}
              onCancel={handleCancelAddDevice}
            />
          ) : (
            <div className="mt-4">
              <button
                onClick={handleAddDevice}
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Add Device
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GatewayDetails;
