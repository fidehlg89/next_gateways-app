import { Device } from "./Device";

export interface Gateway {
    _id: string;
    serialNumber: string;
    name: string;
    ipAddress: string;
    devices: Device[];
}
