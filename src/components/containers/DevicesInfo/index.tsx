import { Device } from "@/src/interfaces";
import React from "react";

export type IDevicesInfoProps = {
  devices: Device[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
};

const DevicesInfo = ({ devices, onDelete }: IDevicesInfoProps) => {
  const [editingIndex, setEditingIndex] = React.useState<number>(-1);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleDeviceChange = (index: number, field: string, value: string) => {
    // Actualizar el dispositivo editado en el estado local o en el estado global, según sea necesario
  };

  const handleSave = (index: number) => {
    // Guardar los cambios del dispositivo editado y salir del modo de edición
    setEditingIndex(-1);
  };

  const handleCancelEdit = () => {
    // Cancelar la edición y salir del modo de edición
    setEditingIndex(-1);
  };

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold">Devices</h2>
      <ul>
        {devices.map((device: Device, index: number) => (
          <li key={device.uid} className="mb-2">
            {editingIndex === index ? (
              // Campos editables
              <div>
                <input
                  type="text"
                  value={device.uid}
                  onChange={(e) =>
                    handleDeviceChange(index, "uid", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={device.vendor}
                  onChange={(e) =>
                    handleDeviceChange(index, "vendor", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={device.status}
                  onChange={(e) =>
                    handleDeviceChange(index, "status", e.target.value)
                  }
                />
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={() => handleCancelEdit()}>Cancel</button>
              </div>
            ) : (
              // Campos no editables
              <div>
                <span className="font-semibold">UID:</span> {device.uid},
                <span className="font-semibold">Vendor:</span> {device.vendor},
                <span className="font-semibold">Status:</span> {device.status}
                <button
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 ml-2 text-white bg-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="px-2 py-1 ml-2 text-white bg-red-500 rounded"
                >
                  Delete
                </button>

              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevicesInfo;
