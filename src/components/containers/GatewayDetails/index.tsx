"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Gateway, Device } from "@/src/interfaces";
import { ToastContainer, toast } from "react-toastify";
import DevicesInfo from "../DevicesInfo";

export type GatewayDetailsProps = {
  id: string;
};

const GatewayDetails = ({ id }: GatewayDetailsProps) => {
  const [gateway, setGateway] = useState<Gateway | null>(null);
  const [editedDevices, setEditedDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchGatewayDetails = async () => {
      try {
        const { data } = await axios.get<Gateway>(
          `${process.env.API_URL}/gateways/${id}`
        );
        setGateway(data);
        setEditedDevices(data.devices);
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

  const handleEditDevice = (index: number) => {
    // Lógica para manejar la edición del dispositivo
    console.log("Editar dispositivo en el índice:", index);
  };


  return (
    <>
      {gateway && (
        <div className="max-w-md mx-auto">
          <ToastContainer />
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Gateway Information
            </h3>
            <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">
              Gateway details .
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
        </div>
      )}
    </>
  );
};

export default GatewayDetails;
