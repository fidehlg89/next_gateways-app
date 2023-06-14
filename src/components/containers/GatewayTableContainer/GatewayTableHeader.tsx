import { IGatewayTableHeaderProps } from "@/src/types";
import React from "react";

const GatewayTableHeader = ({ header }: IGatewayTableHeaderProps) => {
  return (
    <thead>
      <tr className="bg-gray-200">
        {header.map((column) => (
          <th key={column.name} className={`p-4 ${column.className}`}>
            {column.text}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default GatewayTableHeader;
