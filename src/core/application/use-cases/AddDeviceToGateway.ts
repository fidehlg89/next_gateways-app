import { IGatewayRepository } from "../ports/GatewayRepository";
import { Device } from "../../domain/entities/Device";
import { Gateway } from "../../domain/entities/Gateway";

export class AddDeviceToGateway {
    constructor(private readonly repository: IGatewayRepository) { }

    async execute(gatewayId: string, device: Device): Promise<Gateway> {
        const gateway = await this.repository.findById(gatewayId);
        if (!gateway) {
            throw new Error("Gateway not found");
        }

        const updatedDevices = [...gateway.devices, device];
        const updatedGateway = { ...gateway, devices: updatedDevices };

        return this.repository.update(updatedGateway);
    }
}
