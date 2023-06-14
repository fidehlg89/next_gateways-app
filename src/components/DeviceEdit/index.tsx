import React, { useState } from "react";
import { Device } from "@/src/interfaces";
import { IEditDeviceProps } from "@/src/types";

const DeviceEdit = ({ device, onUpdateDevice }: IEditDeviceProps) => {
  const [editedDevice, setEditedDevice] = useState<Device>(device);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditedDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    onUpdateDevice(editedDevice);
  };

  return (
    <div>
      <h3>Edit Device</h3>

      <div className="flex flex-col">
        <label className="block mb-2">
          UID:
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="number"
            name="uid"
            value={editedDevice.uid}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2">
          Vendor:
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            name="vendor"
            value={editedDevice.vendor}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2">
          Status:
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="status"
            value={editedDevice.status}
            onChange={handleInputChange}
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </label>
        <button
          className="px-2 py-1 text-sm text-white bg-blue-700 rounded place-self-end"
          onClick={handleUpdate}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DeviceEdit;
