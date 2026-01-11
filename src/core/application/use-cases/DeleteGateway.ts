import { IGatewayRepository } from "../ports/GatewayRepository";

export class DeleteGateway {
    constructor(private readonly repository: IGatewayRepository) { }

    async execute(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}
