import { Device } from "@/src/interfaces";
import React from "react";

export type IDevicesInfoProps = {
  devices: Device[];
  onDelete: (index: number) => void;
  onEdit: (index: number, device: Device) => void;
};

const DevicesInfo = ({ devices, onDelete, onEdit }: IDevicesInfoProps) => {
  const [editingIndex, setEditingIndex] = React.useState<number>(-1);
  const [editedDevice, setEditedDevice] = React.useState<Device>({
    uid: 0,
    vendor: "",
    status: ""
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedDevice(devices[index]);
  };

  const handleDeviceChange = (field: keyof Device, value: string) => {
    setEditedDevice((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSave = (index: number) => {
    onEdit(index, editedDevice);
    setEditingIndex(-1);
  };

  const handleCancelEdit = () => {
    // Cancel editión
    setEditingIndex(-1);
  };

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold">Devices</h2>
      <ul>
        {devices.map((device: Device, index: number) => (
          <li key={device.uid} className="mb-4">
            {editingIndex === index ? (
              // Campos editables
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="w-20 font-semibold">UID:</label>
                  <input
                    type="text"
                    value={editedDevice.uid}
                    onChange={(e) => handleDeviceChange("uid", e.target.value)}
                    className="w-64 px-2 py-1 border rounded"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="w-20 font-semibold">Vendor:</label>
                  <input
                    type="text"
                    value={editedDevice.vendor}
                    onChange={(e) =>
                      handleDeviceChange("vendor", e.target.value)
                    }
                    className="w-64 px-2 py-1 border rounded"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="w-20 font-semibold">Status:</label>
                  <input
                    type="text"
                    value={editedDevice.status}
                    onChange={(e) =>
                      handleDeviceChange("status", e.target.value)
                    }
                    className="w-64 px-2 py-1 border rounded"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSave(index)}
                    className="px-4 py-2 text-white bg-green-500 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancelEdit()}
                    className="px-4 py-2 text-white bg-red-500 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Campos no editables
              <div className="flex items-center space-x-4">
                <div>
                  <label className="font-semibold">UID:</label> {device.uid},
                </div>
                <div>
                  <label className="font-semibold">Vendor:</label>{" "}
                  {device.vendor},
                </div>
                <div>
                  <label className="font-semibold">Status:</label>{" "}
                  {device.status}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="px-4 py-2 text-white bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevicesInfo;
