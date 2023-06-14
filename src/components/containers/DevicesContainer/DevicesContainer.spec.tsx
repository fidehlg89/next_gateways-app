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
      status: "online"
    },
    {
      uid: 2,
      vendor: "Device 2",
      dateCreated: new Date(),
      status: "offline"
    }
  ];

  it.skip("renders the table with the correct header and items", () => {

  });
});
