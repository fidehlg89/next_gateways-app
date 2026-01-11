"use client";

import GatewayManagement from "@/src/presentation/features/gateways/components/gateway-manager";
import React from "react";
import { ToastContainer } from "react-toastify";

const GatewaysPage = () => {
  return (
    <>
      <ToastContainer />
      <GatewayManagement />
    </>
  );
};

export default GatewaysPage;
