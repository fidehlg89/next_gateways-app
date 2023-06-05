"use client";

import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import GatewaysList from "@/src/components/containers/GatewaysList";
import Layout from "@/src/components/Layout";
import { Gateway } from "@/src/interfaces";
import GatewayContext from "@/src/context/GatewayContext";
import { toast } from "react-toastify";

const Home = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);

  const fetchData = async () => {
    try {
      // Realiza la solicitud para obtener los gateways
      const response = await axios.get(`${process.env.API_URL}/gateways`);

      // Agrega los gateways al contexto utilizando la función addGateway
      setGateways(response.data);
    } catch (error) {
      console.error("Failed to fetch gateways:", error);
    }
  };

  const deleteGateway = async (id: string) => {
    // const updatedGateways = gateways.filter((gateway) => gateway._id !== id);
    // setGateways(updatedGateways);
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
        <GatewaysList />
      </GatewayContext.Provider>
    </Layout>
  );
};

export default Home;
