import { Device } from "@/src/interfaces";
import React from "react";

type IAddDeviceProps = {
  newDevice: Device;
  onDeviceChange: (field: keyof Device, value: string | number) => void;
  onSaveDevice: () => void;
};

const DeviceAdd = ({ newDevice, onDeviceChange, onSaveDevice }: IAddDeviceProps) => {
  return (
    <div>
      <h3>New Device</h3>

      <div className="flex flex-col">
        <label className="block mb-2">
          UID:
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="number"
            min={1}
            value={newDevice.uid}
            onChange={(e) => onDeviceChange("uid", e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Vendor:
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            value={newDevice.vendor}
            onChange={(e) => onDeviceChange("vendor", e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Created Date:
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            value={newDevice.dateCreated?.toISOString().slice(0, 10)}
            disabled
          />
        </label>
        <label className="block mb-2">
          Status:
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={newDevice.status}
            onChange={(e) => onDeviceChange("status", e.target.value)}
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </label>
        <button
          className="px-2 py-1 text-sm text-white bg-blue-700 rounded place-self-end"
          onClick={onSaveDevice}
        >
          Save Device
        </button>
      </div>
    </div>
  );
};

export default DeviceAdd;
