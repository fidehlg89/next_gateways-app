import { Gateway } from "@/src/interfaces";
import React from "react";
import GatewayTableItem from "./GatewayTableItem";
import useContext from "@/src/hooks/useContext";

export type IGatewayTableProps = {
  header: {
    name: string;
    className: string;
    text: string;
  }[];
  items: Gateway[];
};

const GatewayTable = ({ header, items }: IGatewayTableProps) => {
  const { deleteGateway } = useContext();

  const handleDeleteGateway = (id: string) => {
    if (deleteGateway) deleteGateway(id);
  };

  return (
    <table className="w-full mt-4 bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {header.map((column) => (
            <th key={column.name} className={`p-4 ${column.className}`}>
              {column.text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((gateway) => (
          <GatewayTableItem
            key={gateway._id}
            gateway={gateway}
            onDelete={() => handleDeleteGateway(gateway._id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default GatewayTable;
