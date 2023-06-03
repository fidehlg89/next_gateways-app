"use client";
import axios from "axios";
import { Gateway } from "../../src/interfaces";
import { useEffect, useState } from "react";
import GatewaysList from "@/src/components/containers/GatewaysList";
import Layout from "@/src/components/Layout";

const API_URL = process.env.API_URL || "http://localhost:3000/api";

const Home = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    try {
      const response = await axios.get(`${API_URL}/gateways`);
      setGateways(response.data);
    } catch (error) {
      console.error(
        "Error fetching gateways please check your api request",
        error
      );
    }
  };

  return (
    <Layout>
      <GatewaysList gateways={gateways} />

    </Layout>
  );
};

export default Home;
