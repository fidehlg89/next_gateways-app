export interface Device {
    uid: number;
    vendor: string;
    dateCreated?: Date | null;
    status: string;
}
