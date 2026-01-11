import axios from "axios";
import { IGatewayRepository } from "../../core/application/ports/GatewayRepository";
import { Gateway } from "../../core/domain/entities/Gateway";

export class HttpGatewayRepository implements IGatewayRepository {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async findAll(): Promise<Gateway[]> {
        const response = await axios.get(`${this.baseUrl}/gateways`);
        return response.data;
    }

    async create(gateway: Omit<Gateway, "_id">): Promise<Gateway> {
        const response = await axios.post(`${this.baseUrl}/gateways`, gateway);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await axios.delete(`${this.baseUrl}/gateways/${id}`);
    }

    async update(gateway: Gateway): Promise<Gateway> {
        // Assuming the API supports PUT /gateways/:id
        const response = await axios.put(`${this.baseUrl}/gateways/${gateway._id}`, gateway);
        return response.data;
    }

    async findById(id: string): Promise<Gateway | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/gateways/${id}`);
            return response.data;
        } catch (error) {
            return null; // Or throw error depending on preference
        }
    }
}
