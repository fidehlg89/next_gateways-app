import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GatewayTable from "./GatewayTable";

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe("GatewayTable", () => {
  const gateways = [
    {
      _id: "1",
      serialNumber: "ABC123",
      name: "Gateway 1",
      ipAddress: "192.168.0.1",
      devices: []
    },
    {
      _id: "2",
      serialNumber: "DEF456",
      name: "Gateway 2",
      ipAddress: "192.168.0.2",
      devices: []
    }
  ];

  it.skip("renders the table with the correct number of gateways", () => {});
});
