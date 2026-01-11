import { Gateway } from "@/src/core/domain/entities/Gateway"
import { Badge } from "@/src/presentation/components/ui/badge"
import { Button } from "@/src/presentation/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/presentation/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/presentation/components/ui/dropdown-menu"
import { Eye, Trash2, MoreVertical } from "lucide-react"

interface GatewayTableProps {
    gateways: Gateway[]
    loading: boolean
    onDelete: (id: string) => void
    onViewDetails: (gateway: Gateway) => void
}

export default function GatewayTable({ gateways, loading, onDelete, onViewDetails }: GatewayTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Serial Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Devices</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {gateways.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                {loading ? "Loading gateways..." : "No gateways found"}
                            </TableCell>
                        </TableRow>
                    ) : (
                        gateways.map((gateway) => (
                            <TableRow key={gateway._id}>
                                <TableCell className="font-mono text-sm">{gateway.serialNumber}</TableCell>
                                <TableCell className="font-medium">{gateway.name}</TableCell>
                                <TableCell className="font-mono text-sm text-muted-foreground">{gateway.ipAddress}</TableCell>
                                <TableCell>
                                    <Badge variant={gateway.devices.length > 0 ? "default" : "secondary"} className="font-mono">
                                        {gateway.devices.length}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                                <span className="sr-only">Open menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onViewDetails(gateway)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-destructive focus:text-destructive"
                                                onClick={() => onDelete(gateway._id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
