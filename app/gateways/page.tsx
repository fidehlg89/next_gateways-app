"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import GatewayManagement from "./components/gateway-manager";

const GatewaysPage = () => {
  return (
    <>
      <ToastContainer />
      <GatewayManagement />
    </>
  );
};

export default GatewaysPage;
