import React, { useState } from "react";
import useContext from "../../../hooks/useContext";
import GatewayItem from "../../GatewayItem";
import Link from "next/link";
import { Pagination } from "../../utils/Pagination";

const GatewaysList = () => {
  const { gateways, deleteGateway } = useContext();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGateways = gateways.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteGateway = (id: string) => {
    if (deleteGateway) deleteGateway(id);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Link
        href="/gateways/create"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Add New Gateway
      </Link>
      <table className="w-full mt-4 bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Serial Number</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">IP Address</th>
            <th className="p-4 text-center">Devices</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentGateways.map((gateway) => (
            <GatewayItem
              key={gateway._id}
              gateway={gateway}
              onDelete={() => handleDeleteGateway(gateway._id)}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalItems={gateways.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GatewaysList;
