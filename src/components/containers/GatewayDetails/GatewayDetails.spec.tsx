import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import GatewayDetails from "../GatewayDetails";

jest.mock("axios");

describe("GatewayDetails", () => {
  const gatewayId = "gatewayId";
  const gatewayData = {
    id: gatewayId,
    name: "Gateway 1",
    address: "192.168.0.1",
    devices: [
      {
        uid: 1,
        vendor: "Device 1",
        dateCreated: new Date(),
        status: "online"
      }
    ]
  };
});
