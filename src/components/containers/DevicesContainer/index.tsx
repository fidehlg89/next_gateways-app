import React from "react";
import { IDevicesListProps } from "@/src/types";
import DevicesTable from "../DevicesTable";

const header = [
  {
    name: "uid",
    className: "text-left",
    text: "UID"
  },
  {
    name: "vendor",
    className: "text-left",
    text: "Vendor"
  },
  {
    name: "dateCreated",
    className: "text-left",
    text: "Created Date"
  },
  {
    name: "status",
    className: "text-left",
    text: "Status"
  },
  { name: "", className: "", text: "" }
];

const DevicesContainer = ({ devices, onRemove, onEdit }: IDevicesListProps) => {
  return <DevicesTable header={header} items={devices} onEdit={onEdit} onRemove={onRemove} />;
};

export default DevicesContainer;
