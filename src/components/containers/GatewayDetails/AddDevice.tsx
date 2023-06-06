import { Device } from "@/src/interfaces";
import { useState } from "react";

export type IAddDeviceProps = {
  onSave: (device: Device) => void;
  onCancel: () => void;
};

const AddDevice = ({ onSave, onCancel }: IAddDeviceProps) => {
  const [newDevice, setNewDevice] = useState<Device>({
    uid: 0,
    vendor: "",
    dateCreated: new Date(),
    status: ""
  });

  const handleNewDeviceChange = (field: keyof Device, value: string) => {
    setNewDevice((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSaveNewDevice = () => {
    onSave(newDevice);
  };

  const handleCancelAddDevice = () => {
    onCancel();
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center space-x-2">
        <label className="w-20 font-semibold">UID:</label>
        <input
          type="text"
          value={newDevice.uid}
          onChange={(e) => handleNewDeviceChange("uid", e.target.value)}
          className="w-64 px-2 py-1 border rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="w-20 font-semibold">Vendor:</label>
        <input
          type="text"
          value={newDevice.vendor}
          onChange={(e) => handleNewDeviceChange("vendor", e.target.value)}
          className="w-64 px-2 py-1 border rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="w-20 font-semibold">Status:</label>
        <input
          type="text"
          value={newDevice.status}
          onChange={(e) => handleNewDeviceChange("status", e.target.value)}
          className="w-64 px-2 py-1 border rounded"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSaveNewDevice}
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          Save
        </button>
        <button
          onClick={handleCancelAddDevice}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddDevice;
