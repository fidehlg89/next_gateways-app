import React, { useState } from "react";
import useContext from "@/src/hooks/useContext";
import GatewayTable from "./GatewayTable";
import { IGatewayTableContainerProps } from "@/src/types";
import { Pagination } from "../../utils/Pagination";

const GatewayTableContainer = ({ gateways }: IGatewayTableContainerProps) => {

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGateways = gateways.slice(indexOfFirstItem, indexOfLastItem);

  const { deleteGateway } = useContext();

  const handleDeleteGateway = (id: string) => {
    if (deleteGateway) deleteGateway(id);
  };

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
    <>
      <GatewayTable gateways={currentGateways} onGatewayDelete={handleDeleteGateway} />
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
    </>
  );
};

export default GatewayTableContainer;
