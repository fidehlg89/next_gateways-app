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

export type IGatewayDetailsProps = {
  id: string | string[];
};
