import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import DevicesContainer from "../DevicesContainer";
import { DevicesTableHeaderData } from "@/src/static/DevicesTableHeaderData";

describe("DevicesContainer", () => {
  const devices = [
    {
      uid: 1,
      vendor: "Device 1",
      dateCreated: new Date(),
      status: "online",
    },
    {
      uid: 2,
      vendor: "Device 2",
      dateCreated: new Date(),
      status: "offline",
    },
  ];

  test("renders the table with the correct header and items", () => {
    const onRemove = jest.fn();
    const onEdit = jest.fn();

    render(
      <DevicesContainer devices={devices} onRemove={onRemove} onEdit={onEdit} />
    );

    const table = screen.getByRole("table");
    const headerRow = screen.getByRole("rowgroup", { name: "Table Header" });
    const itemRows = screen.getAllByRole("row", { name: /Device \d/ });

    expect(table).toBeInTheDocument();
    expect(headerRow).toBeInTheDocument();
    expect(itemRows.length).toBe(devices.length);

    // Verify the header columns
    const headerColumns = screen.getAllByRole("columnheader");
    expect(headerColumns.length).toBe(DevicesTableHeaderData.length);

    DevicesTableHeaderData.forEach((headerItem, index) => {
      expect(headerColumns[index]).toHaveTextContent(headerItem.text);
    });

    // Verify the item data
    devices.forEach((device, index) => {
      const itemRow = itemRows[index];
      const columns = within(itemRow).getAllByRole("cell");

      expect(columns[0]).toHaveTextContent(device.uid.toString());
      expect(columns[1]).toHaveTextContent(device.vendor);
      expect(columns[2]).toHaveTextContent(
        device.dateCreated instanceof Date
          ? device.dateCreated.toISOString().slice(0, 10)
          : ""
      );
      expect(columns[3]).toHaveTextContent(device.status);

      // Verify edit button
      const editButton = within(columns[4]).getByRole("button", {
        name: "Edit",
      });
      fireEvent.click(editButton);
      expect(onEdit).toHaveBeenCalledWith(index);

      // Verify remove button
      const removeButton = within(columns[4]).getByRole("button", {
        name: "Delete",
      });
      fireEvent.click(removeButton);
      expect(onRemove).toHaveBeenCalledWith(index);
    });
  });
});
