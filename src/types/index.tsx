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
};

export interface IDevicesListProps {
  devices: Device[];
  onAddDevice: (e: React.FormEvent) => void;
  onDeviceChange: (
    index: number,
    field: keyof Device,
    value: string | number
  ) => void;
  onRemoveDevice: (index: number) => void;
}
