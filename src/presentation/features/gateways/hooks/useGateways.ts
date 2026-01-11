import { useState, useEffect, useCallback } from "react";
import { Gateway } from "@/src/core/domain/entities/Gateway";
import { Device } from "@/src/core/domain/entities/Device";
import { HttpGatewayRepository } from "@/src/infrastructure/http/HttpGatewayRepository";
import { GetGateways } from "@/src/core/application/use-cases/GetGateways";
import { CreateGateway } from "@/src/core/application/use-cases/CreateGateway";
import { DeleteGateway } from "@/src/core/application/use-cases/DeleteGateway";
import { AddDeviceToGateway } from "@/src/core/application/use-cases/AddDeviceToGateway";

// Instantiate outside/inside component depending on dependency injection needs. 
// For simplicity, we assume process.env.API_URL is available.
const repository = new HttpGatewayRepository(process.env.API_URL || "");

const getGatewaysUseCase = new GetGateways(repository);
const createGatewayUseCase = new CreateGateway(repository);
const deleteGatewayUseCase = new DeleteGateway(repository);
const addDeviceToGatewayUseCase = new AddDeviceToGateway(repository);

export const useGateways = () => {
    const [gateways, setGateways] = useState<Gateway[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGateways = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getGatewaysUseCase.execute();
            setGateways(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch gateways");
        } finally {
            setLoading(false);
        }
    }, []);

    const createGateway = async (gatewayData: Omit<Gateway, "_id">) => {
        try {
            const newGateway = await createGatewayUseCase.execute(gatewayData);
            setGateways(prev => [...prev, newGateway]);
            return newGateway;
        } catch (err: any) {
            throw new Error(err.message || "Failed to create gateway");
        }
    };

    const removeGateway = async (id: string) => {
        try {
            await deleteGatewayUseCase.execute(id);
            setGateways(prev => prev.filter(g => g._id !== id));
        } catch (err: any) {
            throw new Error(err.message || "Failed to delete gateway");
        }
    };

    const addDevice = async (gatewayId: string, device: Device) => {
        try {
            const updatedGateway = await addDeviceToGatewayUseCase.execute(gatewayId, device);
            setGateways(prev => prev.map(g => g._id === gatewayId ? updatedGateway : g));
            return updatedGateway;
        } catch (err: any) {
            throw new Error(err.message || "Failed to add device");
        }
    }

    useEffect(() => {
        fetchGateways();
    }, [fetchGateways]);

    return {
        gateways,
        loading,
        error,
        createGateway,
        removeGateway,
        addDevice,
        refreshGateways: fetchGateways
    };
};
