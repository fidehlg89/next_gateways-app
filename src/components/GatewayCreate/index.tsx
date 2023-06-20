import React from "react";
import { ToastContainer } from "react-toastify";
import GatewayForm from "../GatewayForm";

const GatewayCreate = () => {
  return (
    <div className="w-full">
      <ToastContainer />
      <h1 className="mb-4 text-2xl font-bold">Add Gateway</h1>
      <GatewayForm />
    </div>
  );
};

export default GatewayCreate;
