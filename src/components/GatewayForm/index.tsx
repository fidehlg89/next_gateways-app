"use client";

import { Device, Gateway } from "@/src/interfaces";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DevicesContainer from "../containers/DevicesContainer";
import { FieldValues, useForm } from "react-hook-form";
import { createGateway } from "@/src/api/gateways.api";
import Modal from "@/src/shared/Modal";
import AddDevice from "../DeviceAdd";
import EditDevice from "../DeviceEdit";
import { toast } from "react-toastify";

const GatewayForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [devices, setDevices] = useState<Device[]>([]);

  const [newDevice, setNewDevice] = useState<Device>({
    uid: 1,
    vendor: "",
    dateCreated: new Date(),
    status: ""
  });

  const [editedDevice, setEditedDevice] = useState<Device | null>(null);

  const [showModal, setShowModal] = useState(false);

  const handleRemoveDevice = (index: number) => {
    const updatedDevices = [...devices];
    updatedDevices.splice(index, 1);
    setDevices(updatedDevices);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const fieldValues: FieldValues = data;

      const gateway: Gateway = {
        _id: fieldValues._id,
        serialNumber: fieldValues.serialNumber,
        name: fieldValues.name,
        ipAddress: fieldValues.ipAddress,
        devices: devices
      };

      await createGateway(gateway);
      await toast.success("Gateway added successfully!");
      setTimeout(() => {
        router.push("/gateways");
      }, 2000);
    } catch (error) {
      toast.error("Failed to add gateway. Please try again later.");
    }
  });

  const handleEditDevice = (index: number) => {
    const deviceToEdit = devices[index];
    setEditedDevice(deviceToEdit);
    setShowModal(true);
  };

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
    <>
      <form onSubmit={onSubmit} className="grid grid-cols-4">
        <div className="col-span-2 mb-5">
          <div className="mb-4">
            <label className="block">
              Serial Number:
              <input
                className={`w-full px-3 py-2 border border-gray-300 rounded ${
                  errors.title ? "border-red-500" : ""
                }`}
                type="text"
                {...register("serialNumber", { required: true })}
              />
            </label>
            {errors.serialNumber && (
              <span className="text-sm font-light text-red-500 ">
                Serial Number field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Name:
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                {...register("name", { required: false })}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              IP Address:
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                {...register("ipAddress", { required: true })}
              />
            </label>
            {errors.ipAddress && (
              <span className="text-sm font-light text-red-500 ">
                IP Address field is required
              </span>
            )}
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
    </>
  );
};

export default GatewayForm;
