export interface Gateway {
  _id: string;
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices: Device[];
}

export interface Device {
  uid: number;
  vendor: string;
  dateCreated?: Date | null;
  status: string;
}
