import React from "react";
import useContext from "../../../hooks/useContext";
import Link from "next/link";
import GatewayTableContainer from "../GatewayTableContainer";

const GatewaysContainer = () => {
  const { gateways } = useContext();

  return (
    <>
      <Link
        href="/gateways/create"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Add New Gateway
      </Link>
      <GatewayTableContainer gateways={gateways} />
    </>
  );
};

export default GatewaysContainer;
