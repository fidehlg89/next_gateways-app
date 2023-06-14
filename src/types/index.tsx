import { Device, Gateway } from "../interfaces";

export type IGatewayProviderProps = React.PropsWithChildren & {};

export type ILayoutProps = React.PropsWithChildren & {};

export type IGatewaysProps = {
  gateways: Gateway[];
};

export type IGatewayContextProps = {
  gateways: Gateway[];
  addGateway?: (gateway: Gateway) => void;
  deleteGateway?: (id: string) => void;
};

export type IGatewayTableHeaderProps = {
  header: {
    name: string;
    className: string;
    text: string;
  }[];
};

export type IGatewayTableContainerProps = IGatewaysProps & {};

export type IGatewayTableProps = IGatewaysProps & {
  onGatewayDelete: (id: string) => void;
};

export type IGatewayTableItemProps = {
  gateway: Gateway;
  onDelete: () => void;
};

export type IGatewayDetailsProps = {
  id: string | string[];
};

export type IPaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type IDevicesListProps = {
  devices: Device[];
  onRemove: (index: number) => void;
  onEdit: (index: number) => void;
};

export type IEditDeviceProps = {
  device: Device;
  onUpdateDevice: (updatedDevice: Device) => void;
};

export type IDevicesTableProps = {
  header: {
    name: string;
    className: string;
    text: string;
  }[];
  items: Device[];
  onRemove: (i: number) => void;
  onEdit: (i: number) => void;
};

export type IErrorPageProps = {
  error: string
}