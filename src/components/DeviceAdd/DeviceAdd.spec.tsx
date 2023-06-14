import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceAdd from "./";

describe("AddDevice", () => {
  const newDevice = {
    uid: 123,
    vendor: "Vendor A",
    dateCreated: new Date(),
    status: "online"
  };

  const onDeviceChangeMock = jest.fn();
  const onSaveDeviceMock = jest.fn();

  beforeEach(() => {
    render(
      <DeviceAdd
        newDevice={newDevice}
        onDeviceChange={onDeviceChangeMock}
        onSaveDevice={onSaveDeviceMock}
      />
    );
  });

  it("renders the form with the correct inputs and values", () => {
    expect(screen.getByLabelText("UID:")).toHaveValue(newDevice.uid);
    expect(screen.getByLabelText("Vendor:")).toHaveValue(newDevice.vendor);
    expect(screen.getByLabelText("Created Date:")).toHaveValue(
      newDevice.dateCreated?.toISOString().slice(0, 10)
    );
    expect(screen.getByLabelText("Status:")).toHaveValue(newDevice.status);
  });

  it("calls onDeviceChange when input values change", () => {
    const uidInput = screen.getByLabelText("UID:");
    fireEvent.change(uidInput, { target: { value: "456" } });
    expect(onDeviceChangeMock).toHaveBeenCalledWith("uid", "456");

    const vendorInput = screen.getByLabelText("Vendor:");
    fireEvent.change(vendorInput, { target: { value: "Vendor B" } });
    expect(onDeviceChangeMock).toHaveBeenCalledWith("vendor", "Vendor B");

    const statusSelect = screen.getByLabelText("Status:");
    fireEvent.change(statusSelect, { target: { value: "offline" } });
    expect(onDeviceChangeMock).toHaveBeenCalledWith("status", "offline");
  });

  it("calls onSaveDevice when the Save Device button is clicked", () => {
    const saveButton = screen.getByText("Save Device");
    fireEvent.click(saveButton);
    expect(onSaveDeviceMock).toHaveBeenCalledTimes(1);
  });
});
