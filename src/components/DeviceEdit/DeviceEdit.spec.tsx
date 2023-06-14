import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceEdit from ".";

describe("DeviceEdit", () => {
  const device = {
    uid: 123,
    vendor: "Vendor Name",
    status: "online"
  };

  const onUpdateDevice = jest.fn();

  beforeEach(() => {
    render(<DeviceEdit device={device} onUpdateDevice={onUpdateDevice} />);
  });

  it("renders the form with the correct inputs and values", () => {
    expect(screen.getByLabelText("UID:")).toHaveValue(device.uid);
    expect(screen.getByLabelText("Vendor:")).toHaveValue(device.vendor);
    expect(screen.getByLabelText("Status:")).toHaveValue(device.status);
  });

  it("updates the edited device when input values change", () => {
    const newVendor = "New Vendor";
    const newStatus = "offline";

    fireEvent.change(screen.getByLabelText("Vendor:"), {
      target: { value: newVendor }
    });
    fireEvent.change(screen.getByLabelText("Status:"), {
      target: { value: newStatus }
    });

    expect(screen.getByLabelText("Vendor:")).toHaveValue(newVendor);
    expect(screen.getByLabelText("Status:")).toHaveValue(newStatus);
  });

  it("calls onUpdateDevice with the edited device when Save Changes is clicked", () => {
    const newVendor = "New Vendor";
    const newStatus = "offline";

    fireEvent.change(screen.getByLabelText("Vendor:"), {
      target: { value: newVendor }
    });
    fireEvent.change(screen.getByLabelText("Status:"), {
      target: { value: newStatus }
    });
    fireEvent.click(screen.getByText("Save Changes"));

    expect(onUpdateDevice).toHaveBeenCalledWith({
      ...device,
      vendor: newVendor,
      status: newStatus
    });
  });
});
