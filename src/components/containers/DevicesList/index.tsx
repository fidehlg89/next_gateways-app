import { Device } from "@/src/interfaces";
import { IDevicesListProps } from "@/src/types";
import React from "react";

const DevicesList = ({
  devices,
  onAddDevice,
  onDeviceChange,
  onRemoveDevice
}: IDevicesListProps) => {
  const handleDeviceChange = (
    index: number,
    field: keyof Device,
    value: string | number
  ) => {
    onDeviceChange(index, field, value);
  };

  return (
    <>
      <h2 className="mb-2 text-lg font-bold">Peripheral Devices:</h2>
      {devices.map((device, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2">
            UID:
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="number"
              value={device.uid}
              onChange={(e) => handleDeviceChange(index, "uid", e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Vendor:
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="text"
              value={device.vendor}
              onChange={(e) => handleDeviceChange(index, "vendor", e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Created Date:
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="text"
              value={device.dateCreated?.toISOString().slice(0, 10)}
              disabled
            />
          </label>
          <label className="block mb-2">
            Status:
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={device.status}
              onChange={(e) => handleDeviceChange(index, "status", e.target.value)}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </label>
          <button
            className="px-2 py-1 text-sm text-red-700 bg-transparent border border-red-700 rounded"
            onClick={() => onRemoveDevice(index)}
          >
            Cancel
          </button>
        </div>
      ))}
      <button
        className="px-2 py-1 text-sm text-white bg-blue-700 rounded"
        onClick={onAddDevice}
      >
        Add Device
      </button>
    </>
  );
};

export default DevicesList;
