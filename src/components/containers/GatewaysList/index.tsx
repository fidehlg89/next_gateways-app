import React, { useState } from "react";
import useContext from "../../../hooks/useContext";
import GatewayItem from "../GatewayItem";
import Link from "next/link";
import { Pagination } from "../../utils/Pagination";
import GatewayTable from "../GatewayTable";

const header = [
  {
    name: "Serial Number",
    className: "text-left",
    text: "Serial Number"
  },
  {
    name: "Name",
    className: "text-left",
    text: "Name"
  },
  {
    name: "IP Address",
    className: "text-left",
    text: "IP Address"
  },
  {
    name: "Devices",
    className: "text-center",
    text: "Devices"
  },
  {
    name: "Actions",
    className: "text-center",
    text: "Actions"
  }
];

const GatewaysList = () => {
  const { gateways } = useContext();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGateways = gateways.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1);
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
      <GatewayTable header={header} items={currentGateways} />

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalItems={gateways.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default GatewaysList;
