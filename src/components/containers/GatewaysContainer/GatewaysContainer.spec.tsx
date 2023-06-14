import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import GatewayContext from "@/src/context/GatewayContext";
import { Gateway } from "@/src/interfaces";

const mockGateways: Gateway[] = [
  {
    _id: "1234234",
    serialNumber: "123456789",
    name: "Gateway 1",
    ipAddress: "192.168.0.1",
    devices: [],
  },
];

describe("GatewayContext", () => {
  it("provides the gateways array to the component", () => {
    const TestComponent = () => {
      const context = useContext(GatewayContext);
      return <div data-testid="gateways-length">{context.gateways.length}</div>;
    };

    render(
      <GatewayContext.Provider value={{ gateways: mockGateways }}>
        <TestComponent />
      </GatewayContext.Provider>
    );

    const gatewaysLength = screen.getByTestId("gateways-length");
    expect(gatewaysLength.textContent).toBe("1");
  });
});
