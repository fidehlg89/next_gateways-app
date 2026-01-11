import { useState } from "react"
import { Gateway } from "@/src/core/domain/entities/Gateway"
import { Device } from "@/src/core/domain/entities/Device"
import { Button } from "@/src/presentation/components/ui/button"
import { Input } from "@/src/presentation/components/ui/input"
import { Label } from "@/src/presentation/components/ui/label"
import { Badge } from "@/src/presentation/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/src/presentation/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/presentation/components/ui/table"
import { toast } from "react-toastify"

interface GatewayDetailsDialogProps {
    isOpen: boolean
    onClose: () => void
    gateway: Gateway | null
    onAddDevice: (gatewayId: string, device: Device) => Promise<void>
}

export default function GatewayDetailsDialog({ isOpen, onClose, gateway, onAddDevice }: GatewayDetailsDialogProps) {
    const [newDeviceDetail, setNewDeviceDetail] = useState<Partial<Device>>({
        uid: 0,
        vendor: "",
        status: "online",
    })

    // When gateway changes, reset form? Or just keep it. 
    // Probably good to reset when closing, but isOpen is controlled by parent.

    const handleAddDeviceToGateway = async () => {
        if (!gateway || !gateway._id) return
        if (!newDeviceDetail.uid || !newDeviceDetail.vendor) {
            toast.error("Please fill in all device fields")
            return
        }

        const device: Device = {
            uid: Number(newDeviceDetail.uid),
            vendor: newDeviceDetail.vendor || "",
            status: newDeviceDetail.status || "online",
            dateCreated: new Date(),
        }

        await onAddDevice(gateway._id, device)
        setNewDeviceDetail({ uid: 0, vendor: "", status: "online" })
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Gateway Details</DialogTitle>
                    <DialogDescription>
                        Details for gateway {gateway?.serialNumber}
                    </DialogDescription>
                </DialogHeader>

                {gateway && (
                    <div className="py-4">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div>
                                <Label className="text-muted-foreground">Serial Number</Label>
                                <p className="font-medium">{gateway.serialNumber}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Name</Label>
                                <p className="font-medium">{gateway.name}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">IP Address</Label>
                                <p className="font-medium">{gateway.ipAddress}</p>
                            </div>
                        </div>

                        <h3 className="mb-2 text-lg font-semibold">Connected Devices ({gateway.devices.length})</h3>
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>UID</TableHead>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Date Created</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {gateway.devices && gateway.devices.length > 0 ? (
                                        gateway.devices.map((device, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{device.uid}</TableCell>
                                                <TableCell>{device.vendor}</TableCell>
                                                <TableCell>{new Date(device.dateCreated as any).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge variant={device.status === "online" ? "default" : "secondary"}>
                                                        {device.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                                No devices connected
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>


                        <div className="border-t pt-4 mt-4">
                            <h4 className="mb-2 font-semibold">Add New Device</h4>
                            <div className="grid grid-cols-3 gap-2 mb-2">
                                <Input
                                    type="number"
                                    placeholder="UID"
                                    value={newDeviceDetail.uid || ""}
                                    onChange={(e) => setNewDeviceDetail({ ...newDeviceDetail, uid: Number(e.target.value) })}
                                />
                                <Input
                                    placeholder="Vendor"
                                    value={newDeviceDetail.vendor}
                                    onChange={(e) => setNewDeviceDetail({ ...newDeviceDetail, vendor: e.target.value })}
                                />
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={newDeviceDetail.status}
                                    onChange={(e) => setNewDeviceDetail({ ...newDeviceDetail, status: e.target.value })}
                                >
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                </select>
                            </div>
                            <Button type="button" variant="secondary" onClick={handleAddDeviceToGateway} className="w-full">
                                Add Device to Gateway
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
