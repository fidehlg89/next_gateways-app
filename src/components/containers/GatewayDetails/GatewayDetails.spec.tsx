import React from "react";
import { render } from "@testing-library/react";
import GatewayDetails from "../GatewayDetails";

describe("Gateway Details", () => {
  it("renders GatewayDetails component", () => {
    const gatewayId = "123ABC";
    const { getByText } = render(<GatewayDetails id={gatewayId} />);
  });
});
