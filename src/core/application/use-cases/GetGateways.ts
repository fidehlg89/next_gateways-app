import { IGatewayRepository } from "../ports/GatewayRepository";
import { Gateway } from "../../domain/entities/Gateway";

export class GetGateways {
    constructor(private readonly repository: IGatewayRepository) { }

    async execute(): Promise<Gateway[]> {
        return this.repository.findAll();
    }
}
