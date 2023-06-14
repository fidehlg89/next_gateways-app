import React from "react";
import { IDevicesTableProps } from "@/src/types";

const DevicesTable = ({
  header,
  items,
  onEdit,
  onRemove
}: IDevicesTableProps) => {
  return (
    <table className="w-full mt-4 bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {header.map((column, index) => (
            <th key={index} className={`p-2 ${column.className}`}>
              {column.text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((device, index) => (
          <tr key={index} className="bg-white">
            <td className="p-2">{device.uid}</td>
            <td className="p-2">{device.vendor}</td>
            <td className="p-2">
              {device.dateCreated instanceof Date
                ? device.dateCreated.toISOString().slice(0, 10)
                : ""}
            </td>
            <td className="p-2">{device.status}</td>
            <td className="p-2 text-center">
              <button
                type="button"
                className="p-2 mr-1 text-sm text-white bg-yellow-500 rounded-md focus:outline-none hover:bg-yellow-600 hover:shadow-lg"
                onClick={() => onEdit(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                className="p-2 mr-1 text-sm text-white ease-in-out bg-red-500 rounded-md focus:outline-none hover:bg-red-600 hover:shadow-lg"
                onClick={() => onRemove(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DevicesTable;
