import axios from "axios";
import { Gateway } from "../interfaces";

const gatewaysApi = axios.create({
  baseURL: `${process.env.API_URL}/gateways`,
});

export const getAllGateways = () => gatewaysApi.get("/");

export const getGateway = (id: string) => gatewaysApi.get(`/${id}`);

export const createGateway = (gateway: Gateway) => gatewaysApi.post("/", gateway);

export const updateGateway = (id: string, gateway: Gateway) =>
  gatewaysApi.put(`/${id}/`, gateway);

export const deleteGateway = (id: string) => gatewaysApi.delete(`/${id}`);
