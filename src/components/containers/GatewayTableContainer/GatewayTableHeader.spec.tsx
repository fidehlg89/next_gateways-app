import React from "react";
import { render, screen } from "@testing-library/react";
import GatewayTableHeader from "./GatewayTableHeader";

describe("GatewayTableHeader", () => {
  const headerProps = {
    header: [
      { name: "column1", text: "Column 1", className: "text-center" },
      { name: "column2", text: "Column 2", className: "" },
      { name: "column3", text: "Column 3", className: "text-right" },
    ],
  };

  it("renders the table header with the correct columns", () => {
    render(<table><GatewayTableHeader {...headerProps} /></table>);

    const column1 = screen.getByText("Column 1");
    const column2 = screen.getByText("Column 2");
    const column3 = screen.getByText("Column 3");

    expect(column1).toBeInTheDocument();
    expect(column2).toBeInTheDocument();
    expect(column3).toBeInTheDocument();
  });

  it("applies the correct className to each column", () => {
    render(<table><GatewayTableHeader {...headerProps} /></table>);

    const column1 = screen.getByText("Column 1");
    const column2 = screen.getByText("Column 2");
    const column3 = screen.getByText("Column 3");

    expect(column1).toHaveClass("text-center");
    expect(column2).not.toHaveClass("text-center");
    expect(column3).toHaveClass("text-right");
  });
});
