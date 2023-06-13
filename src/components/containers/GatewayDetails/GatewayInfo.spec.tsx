import React from "react";
import { render } from "@testing-library/react";
import GatewayInfo from "./GatewayInfo";
import { Gateway } from "@/src/interfaces";

describe("GatewayInfo", () => {
  const gateway: Gateway = {
    serialNumber: "123456789",
    name: "Gateway 1",
    ipAddress: "192.168.0.1",
    _id: "",
    devices: []
  };

  test("renders gateway information correctly", () => {
    const { getByText } = render(<GatewayInfo gateway={gateway} />);

    const serialNumberElement = getByText(/Serial Number:/i);
    expect(serialNumberElement).toBeInTheDocument();
    expect(serialNumberElement.nextSibling?.textContent).toBe(
      gateway.serialNumber
    );

    const nameElement = getByText(/Name:/i);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.nextSibling?.textContent).toBe(gateway.name);

    const ipAddressElement = getByText(/IP Address:/i);
    expect(ipAddressElement).toBeInTheDocument();
    expect(ipAddressElement.nextSibling?.textContent).toBe(gateway.ipAddress);
  });
});
