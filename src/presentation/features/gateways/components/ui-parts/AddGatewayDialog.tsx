import { useState } from "react"
import { Device } from "@/src/core/domain/entities/Device"
import { Gateway } from "@/src/core/domain/entities/Gateway"
import { Button } from "@/src/presentation/components/ui/button"
import { Input } from "@/src/presentation/components/ui/input"
import { Label } from "@/src/presentation/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/presentation/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/presentation/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "react-toastify"

interface AddGatewayDialogProps {
    onAddGateway: (gateway: Omit<Gateway, "_id">) => Promise<void>
}

export default function AddGatewayDialog({ onAddGateway }: AddGatewayDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [newGateway, setNewGateway] = useState({
        serialNumber: "",
        name: "",
        ipAddress: "",
    })
    const [devices, setDevices] = useState<Device[]>([])
    const [newDevice, setNewDevice] = useState<Partial<Device>>({
        uid: 0,
        vendor: "",
        status: "online",
    })

    const handleAddDevice = () => {
        if (!newDevice.uid || !newDevice.vendor) {
            toast.error("Please fill in all device fields")
            return
        }

        const device: Device = {
            uid: Number(newDevice.uid),
            vendor: newDevice.vendor || "",
            status: newDevice.status || "online",
            dateCreated: new Date(),
        }

        setDevices([...devices, device])
        setNewDevice({ uid: 0, vendor: "", status: "online" })
    }

    const handleRemoveDevice = (index: number) => {
        const updatedDevices = [...devices]
        updatedDevices.splice(index, 1)
        setDevices(updatedDevices)
    }

    const handleSubmit = async () => {
        if (!newGateway.serialNumber || !newGateway.name || !newGateway.ipAddress) {
            toast.error("Please fill in all gateway fields")
            return
        }

        await onAddGateway({ ...newGateway, devices })
        setIsOpen(false)
        setNewGateway({ serialNumber: "", name: "", ipAddress: "" })
        setDevices([])
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Gateway
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Gateway</DialogTitle>
                    <DialogDescription>Enter the details for the new gateway device.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="serial">Serial Number</Label>
                        <Input
                            id="serial"
                            placeholder="ABC12345"
                            value={newGateway.serialNumber}
                            onChange={(e) => setNewGateway({ ...newGateway, serialNumber: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Gateway Name"
                            value={newGateway.name}
                            onChange={(e) => setNewGateway({ ...newGateway, name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="ip">IP Address</Label>
                        <Input
                            id="ip"
                            placeholder="192.168.1.1"
                            value={newGateway.ipAddress}
                            onChange={(e) => setNewGateway({ ...newGateway, ipAddress: e.target.value })}
                        />
                    </div>

                    <div className="border-t pt-4 mt-2">
                        <h4 className="mb-2 font-semibold">Add Devices</h4>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            <Input
                                type="number"
                                placeholder="UID"
                                value={newDevice.uid || ""}
                                onChange={(e) => setNewDevice({ ...newDevice, uid: Number(e.target.value) })}
                            />
                            <Input
                                placeholder="Vendor"
                                value={newDevice.vendor}
                                onChange={(e) => setNewDevice({ ...newDevice, vendor: e.target.value })}
                            />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={newDevice.status}
                                onChange={(e) => setNewDevice({ ...newDevice, status: e.target.value })}
                            >
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>
                        <Button type="button" variant="secondary" onClick={handleAddDevice} className="w-full mb-4">
                            Add Device
                        </Button>

                        {devices.length > 0 && (
                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>UID</TableHead>
                                            <TableHead>Vendor</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {devices.map((device, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{device.uid}</TableCell>
                                                <TableCell>{device.vendor}</TableCell>
                                                <TableCell>{device.status}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-destructive"
                                                        onClick={() => handleRemoveDevice(index)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => {
                        setIsOpen(false)
                        setDevices([])
                        setNewGateway({ serialNumber: "", name: "", ipAddress: "" })
                    }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Add Gateway</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
