import React from "react";
import { render, screen, within } from "@testing-library/react";
import DevicesTable from ".";

describe("DevicesTable", () => {
  const header = [
    { name: "uid", text: "UID", className: "" },
    { name: "vendor", text: "Vendor", className: "" },
    { name: "date", text: "Created Date", className: "" },
    { name: "status", text: "Status", className: "" },
    { name: "actions", text: "Actions", className: "text-center" }
  ];

  const items = [
    {
      uid: 1,
      vendor: "Vendor A",
      dateCreated: new Date(),
      status: "Online"
    },
    {
      uid: 2,
      vendor: "Vendor B",
      dateCreated: new Date(),
      status: "Offline"
    }
  ];

  it.skip("renders the table with the correct header and items", () => {
    render(
      <DevicesTable
        header={header}
        items={items}
        onEdit={() => {}}
        onRemove={() => {}}
      />
    );

    // Check table header
    const table = screen.getByRole("table");
    const headerRow = within(table).getByRole("row");
    expect(headerRow).toBeInTheDocument();

    header.forEach((column, index) => {
      const columnHeader =
        within(headerRow).getAllByRole("columnheader")[index];
      expect(columnHeader).toBeInTheDocument();
      expect(columnHeader).toHaveClass(column.className);
      expect(columnHeader).toHaveTextContent(column.text);
    });

    // Check table items
    const body = within(table).getByRole("rowgroup");
    expect(body).toBeInTheDocument();

    items.forEach((device, rowIndex) => {
      const row = within(body).getAllByRole("row")[rowIndex];
      expect(row).toBeInTheDocument();

      const uidCell = within(row).getByRole("cell", {
        name: device.uid.toString()
      });
      expect(uidCell).toBeInTheDocument();

      const vendorCell = within(row).getByRole("cell", { name: device.vendor });
      expect(vendorCell).toBeInTheDocument();

      const dateCreatedCell = within(row).getByRole("cell", {
        name: device.dateCreated.toISOString().slice(0, 10)
      });
      expect(dateCreatedCell).toBeInTheDocument();

      const statusCell = within(row).getByRole("cell", { name: device.status });
      expect(statusCell).toBeInTheDocument();
    });
  });
});
