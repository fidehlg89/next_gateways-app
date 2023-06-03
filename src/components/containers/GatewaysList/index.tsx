import React from "react";
import { IGatewaysProps } from "@/src/types";
import Link from "next/link";

const GatewaysList = ({ gateways }: IGatewaysProps) => {
  return (
    <div>
      <Link
        href="/gateways/create"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Add Gateway
      </Link>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Serial Number</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">IP Address</th>
            <th className="p-2 text-center">Devices</th>
          </tr>
        </thead>
        <tbody>
          {gateways &&
            gateways.length > 0 &&
            gateways.map((gateway) => (
              <tr key={gateway._id} className="bg-white">
                <td className="p-2">{gateway.serialNumber}</td>
                <td className="p-2">{gateway.name}</td>
                <td className="p-2">{gateway.ipAddress}</td>
                <td className="p-2 text-center">
                  <span className="px-2 py-1 text-sm text-white bg-green-500 rounded">
                    {gateway.devices.length}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GatewaysList;
