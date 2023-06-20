"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GatewaysContainer from "@/src/components/containers/GatewaysContainer";
import Layout from "@/src/components/layouts";
import { Gateway } from "@/src/interfaces";
import GatewayContext from "@/src/context/GatewayContext";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "@/src/components/Error";
import { deleteGateway } from "@/src/api/gateways.api";

const GatewaysPage = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/gateways`);
      setGateways(response.data);
    } catch (error) {
      console.error("Failed to fetch gateways:", error);
      setError(
        `Failed to fetch gateways. Please check your internet connection. ${error}`
      );
    }
  };

  const onDeleteGateway = async (id: string) => {
    try {
      const {
        data: { message }
      } = await deleteGateway(id);
      setGateways(gateways.filter((item) => item._id !== id));
      toast.success(`${message}`);
    } catch (error) {
      console.error("Error deleting gateway:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setGateways]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Layout>
      <ToastContainer />
      <GatewayContext.Provider value={{ gateways, onDeleteGateway }}>
        <GatewaysContainer />
      </GatewayContext.Provider>
    </Layout>
  );
};

export default GatewaysPage;
