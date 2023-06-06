"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GatewaysContainer from "@/src/components/containers/GatewaysContainer";
import Layout from "@/src/components/layouts";
import { Gateway } from "@/src/interfaces";
import GatewayContext from "@/src/context/GatewayContext";
import { toast } from "react-toastify";

const Home = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/gateways`);
      setGateways(response.data);
    } catch (error) {
      console.error("Failed to fetch gateways:", error);
    }
  };

  const deleteGateway = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/gateways/${id}`
      );
      console.log(response.data);
      fetchData();
      toast.success(`${response.data.messaje}`)
    } catch (error) {
      console.error("Error deleting gateway:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setGateways]);

  return (
    <Layout>
      <GatewayContext.Provider value={{ gateways, deleteGateway }}>
        <GatewaysContainer />
      </GatewayContext.Provider>
    </Layout>
  );
};

export default Home;
