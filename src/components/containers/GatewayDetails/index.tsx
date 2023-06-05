"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Gateway, Device } from "@/src/interfaces";

export type GatewayDetailsProps = {
  id: string;
};

const GatewayDetails = ({ id }: GatewayDetailsProps) => {
  const [gateway, setGateway] = useState<Gateway | null>(null);

  useEffect(() => {
    const fetchGatewayDetails = async () => {
      try {
        const response = await axios.get<Gateway>(
          `${process.env.API_URL}/gateways/${id}`
        );
        setGateway(response.data);
      } catch (error) {
        console.error("Error fetching gateway details:", error);
      }
    };

    fetchGatewayDetails();
  }, [id]);

  if (!gateway) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Gateway Details</h2>
      <p>Serial Number: {gateway.serialNumber}</p>
      <p>Name: {gateway.name}</p>
      <p>IP Address: {gateway.ipAddress}</p>
      <h3>Devices</h3>
      <ul>
        {gateway.devices.map((device: Device) => (
          <li key={device.uid}>
            UID: {device.uid}, Vendor: {device.vendor}, Status: {device.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GatewayDetails;
