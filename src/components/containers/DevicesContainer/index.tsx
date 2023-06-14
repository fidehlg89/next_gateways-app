import React from "react";
import { IDevicesListProps } from "@/src/types";
import DevicesTable from "../DevicesTable";
import { DevicesTableHeaderData } from "@/src/static/DevicesTableHeaderData";

const DevicesContainer = ({ devices, onRemove, onEdit }: IDevicesListProps) => {
  return <DevicesTable header={DevicesTableHeaderData} items={devices} onEdit={onEdit} onRemove={onRemove} />;
};

export default DevicesContainer;
