"use client"

import { useState } from "react"
import { Gateway } from "@/src/core/domain/entities/Gateway"
import { Device } from "@/src/core/domain/entities/Device"
import { useGateways } from "@/src/presentation/features/gateways/hooks/useGateways"
import { toast } from "react-toastify"
import { Input } from "@/src/presentation/components/ui/input"
import { Button } from "@/src/presentation/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/presentation/components/ui/card"
import { Search } from "lucide-react"

import GatewayHeader from "./ui-parts/GatewayHeader"
import GatewayTable from "./ui-parts/GatewayTable"
import AddGatewayDialog from "./ui-parts/AddGatewayDialog"
import GatewayDetailsDialog from "./ui-parts/GatewayDetailsDialog"

export default function GatewayManagement() {
  const { gateways, loading, error, createGateway, removeGateway, addDevice } = useGateways()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredGateways = gateways.filter(
    (gateway) =>
      gateway.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gateway.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gateway.ipAddress.includes(searchQuery),
  )

  const handleDelete = async (id: string) => {
    try {
      await removeGateway(id)
      toast.success("Gateway deleted successfully")
    } catch (error) {
      console.error("Error deleting gateway:", error)
      toast.error("Failed to delete gateway")
    }
  }

  const handleCreateGateway = async (gatewayData: Omit<Gateway, "_id">) => {
    try {
      await createGateway(gatewayData)
      toast.success("Gateway added successfully")
    } catch (error) {
      console.error("Error adding gateway:", error)
      toast.error("Failed to add gateway")
    }
  }

  const handleAddDeviceToGateway = async (gatewayId: string, device: Device) => {
    try {
      const updatedGateway = await addDevice(gatewayId, device)
      setSelectedGateway(updatedGateway)
      toast.success("Device added successfully")
    } catch (error) {
      console.error("Error adding device:", error)
      toast.error("Failed to add device")
    }
  }

  const handleViewDetails = (gateway: Gateway) => {
    setSelectedGateway(gateway)
    setIsViewDialogOpen(true)
  }

  const handleCloseViewDetails = () => {
    setIsViewDialogOpen(false)
    setSelectedGateway(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <GatewayHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-2xl">Gateways</CardTitle>
                <CardDescription className="mt-1">Manage and monitor your network gateways</CardDescription>
              </div>
              <AddGatewayDialog onAddGateway={handleCreateGateway} />
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search gateways..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent>
            <GatewayTable
              gateways={filteredGateways}
              loading={loading}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredGateways.length} of {gateways.length} gateways
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Items per page:</span>
                <Button variant="outline" size="sm">
                  10
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <GatewayDetailsDialog
        isOpen={isViewDialogOpen}
        onClose={handleCloseViewDetails}
        gateway={selectedGateway}
        onAddDevice={handleAddDeviceToGateway}
      />
    </div>
  )
}
