import { IGatewayRepository } from "../ports/GatewayRepository";
import { Gateway } from "../../domain/entities/Gateway";

export class CreateGateway {
    constructor(private readonly repository: IGatewayRepository) { }

    async execute(gateway: Omit<Gateway, "_id">): Promise<Gateway> {
        return this.repository.create(gateway);
    }
}
