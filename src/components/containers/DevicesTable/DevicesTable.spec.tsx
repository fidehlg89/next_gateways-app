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

  });
});
