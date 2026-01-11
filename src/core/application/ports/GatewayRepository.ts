import { Gateway } from "../../domain/entities/Gateway";

export interface IGatewayRepository {
    findAll(): Promise<Gateway[]>;
    create(gateway: Omit<Gateway, "_id">): Promise<Gateway>;
    delete(id: string): Promise<void>;
    update(gateway: Gateway): Promise<Gateway>;
    findById(id: string): Promise<Gateway | null>;
}
