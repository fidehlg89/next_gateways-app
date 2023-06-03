"use client";

import React, { useState } from "react";
import { IGatewaysProps } from "@/src/types";
import Link from "next/link";

const itemsPerPage = 10;

const GatewaysList = ({ gateways }: IGatewaysProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page state  c
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGateways = gateways.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1); // Reset current page when changing items per page
    }
  };

  return (
    <div>
      <Link
        href="/gateways/create"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Add New Gateway
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
          {currentGateways.map((gateway) => (
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

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium text-gray-700">Items per page: </label>
        <input
            id="itemsPerPage"
            type="number"
            min="1"
            step="1"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-16 px-2 py-1 text-sm border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        {gateways.length > itemsPerPage && (
          <nav className="flex items-center">
            {/* Previous page button */}
            <button
              className={`${
                currentPage === 1
                  ? "opacity-50 cursor-default"
                  : "cursor-pointer"
              } px-2 py-1 text-sm text-gray-700`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Page buttons */}
            {Array.from({
              length: Math.ceil(gateways.length / itemsPerPage)
            }).map((_, index) => (
              <button
                key={index}
                className={`${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } px-2 py-1 text-sm rounded-full mr-1`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {/* Next page button */}
            <button
              className={`${
                currentPage === Math.ceil(gateways.length / itemsPerPage)
                  ? "opacity-50 cursor-default"
                  : "cursor-pointer"
              } px-2 py-1 text-sm text-gray-700`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(gateways.length / itemsPerPage)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default GatewaysList;
