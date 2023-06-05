import { createContext } from "react";
import { IGatewayContextProps } from "../types";

const GatewayContext = createContext<IGatewayContextProps>({
  gateways: [],
  addGateway: () => {},
  deleteGateway: () => {},
});

export default GatewayContext