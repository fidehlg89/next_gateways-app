import React from "react";
import { render } from "@testing-library/react";
import GatewayTableItem from "./GatewayTableItem";

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

describe("GatewayTableItem", () => {
  const gateway = {
    _id: "1",
    serialNumber: "ABC123",
    name: "Gateway 1",
    ipAddress: "192.168.0.1",
    devices: []
  };

  it.skip("calls renders component", () => {


  });
});
