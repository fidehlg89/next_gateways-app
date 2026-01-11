"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Gateway, Device } from "@/src/interfaces"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Trash2, MoreVertical, Plus, Search, Router } from "lucide-react"




export default function GatewayManagement() {
  const [gateways, setGateways] = useState<Gateway[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [newGateway, setNewGateway] = useState({
    serialNumber: "",
    name: "",
    ipAddress: "",
  })

  // Device creation state
  const [devices, setDevices] = useState<Device[]>([])
  const [newDevice, setNewDevice] = useState<Partial<Device>>({
    uid: 0,
    vendor: "",
    status: "online",
  })

  // Device creation state for View Details
  const [newDeviceDetail, setNewDeviceDetail] = useState<Partial<Device>>({
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

  const fetchGateways = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/gateways`)
      setGateways(response.data)
    } catch (error) {
      console.error("Failed to fetch gateways:", error)
      toast.error("Failed to fetch gateways")
    }
  }

  useEffect(() => {
    fetchGateways()
  }, [])

  const filteredGateways = gateways.filter(
    (gateway) =>
      gateway.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gateway.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gateway.ipAddress.includes(searchQuery),
  )

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.API_URL}/gateways/${id}`)
      setGateways(gateways.filter((g) => g._id !== id))
      toast.success("Gateway deleted successfully")
    } catch (error) {
      console.error("Error deleting gateway:", error)
      toast.error("Failed to delete gateway")
    }
  }

  const handleAddGateway = async () => {
    if (!newGateway.serialNumber || !newGateway.name || !newGateway.ipAddress) {
      return
    }

    try {
      const payload = { ...newGateway, devices }
      const response = await axios.post(`${process.env.API_URL}/gateways`, payload)
      setGateways([...gateways, response.data])
      setNewGateway({ serialNumber: "", name: "", ipAddress: "" })
      setDevices([])
      setIsDialogOpen(false)
      toast.success("Gateway added successfully")
    } catch (error) {
      console.error("Error adding gateway:", error)
      toast.error("Failed to add gateway")
    }
  }

  const handleAddDeviceToGateway = async () => {
    if (!selectedGateway || !selectedGateway._id) return
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

    const updatedDevices = [...selectedGateway.devices, device]

    try {
      const response = await axios.put(`${process.env.API_URL}/gateways/${selectedGateway._id}`, {
        devices: updatedDevices
      })

      // Update local state
      const updatedGateway = response.data
      setGateways(gateways.map(g => g._id === updatedGateway._id ? updatedGateway : g))
      setSelectedGateway(updatedGateway)
      setNewDeviceDetail({ uid: 0, vendor: "", status: "online" })
      toast.success("Device added successfully")
    } catch (error) {
      console.error("Error adding device:", error)
      toast.error("Failed to add device")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Router className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-foreground">Gateway Manager</h1>
                <p className="text-sm text-muted-foreground">Network infrastructure control</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-2xl">Gateways</CardTitle>
                <CardDescription className="mt-1">Manage and monitor your network gateways</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                      setIsDialogOpen(false)
                      setDevices([])
                      setNewGateway({ serialNumber: "", name: "", ipAddress: "" })
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddGateway}>Add Gateway</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                  {filteredGateways.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No gateways found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredGateways.map((gateway) => (
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
                              <DropdownMenuItem onClick={() => {
                                setSelectedGateway(gateway)
                                setIsViewDialogOpen(true)
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(gateway._id)}
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
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Gateway Details</DialogTitle>
            <DialogDescription>
              Details for gateway {selectedGateway?.serialNumber}
            </DialogDescription>
          </DialogHeader>

          {selectedGateway && (
            <div className="py-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <Label className="text-muted-foreground">Serial Number</Label>
                  <p className="font-medium">{selectedGateway.serialNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedGateway.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">IP Address</Label>
                  <p className="font-medium">{selectedGateway.ipAddress}</p>
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold">Connected Devices ({selectedGateway.devices.length})</h3>
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
                    {selectedGateway.devices && selectedGateway.devices.length > 0 ? (
                      selectedGateway.devices.map((device, index) => (
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
    </div >
  )
}
