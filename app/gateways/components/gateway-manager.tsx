"use client"

import { useState } from "react"
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

interface Gateway {
  id: string
  serialNumber: string
  name: string
  ipAddress: string
  devices: number
  status: "online" | "offline"
}

const initialGateways: Gateway[] = [
  {
    id: "1",
    serialNumber: "123ABC",
    name: "Gateway 1",
    ipAddress: "10.10.1.1",
    devices: 0,
    status: "online",
  },
  {
    id: "2",
    serialNumber: "ABC1234",
    name: "Gateway 1",
    ipAddress: "6.6.6.6",
    devices: 1,
    status: "online",
  },
  {
    id: "3",
    serialNumber: "ABC123444",
    name: "PC-Director",
    ipAddress: "192.168.1.100",
    devices: 10,
    status: "online",
  },
]

export default function GatewayManagement() {
  const [gateways, setGateways] = useState<Gateway[]>(initialGateways)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredGateways = gateways.filter(
    (gateway) =>
      gateway.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gateway.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gateway.ipAddress.includes(searchQuery),
  )

  const handleDelete = (id: string) => {
    setGateways(gateways.filter((g) => g.id !== id))
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
                      <Input id="serial" placeholder="ABC12345" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Gateway Name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="ip">IP Address</Label>
                      <Input id="ip" placeholder="192.168.1.1" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Add Gateway</Button>
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
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGateways.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        No gateways found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredGateways.map((gateway) => (
                      <TableRow key={gateway.id}>
                        <TableCell className="font-mono text-sm">{gateway.serialNumber}</TableCell>
                        <TableCell className="font-medium">{gateway.name}</TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">{gateway.ipAddress}</TableCell>
                        <TableCell>
                          <Badge variant={gateway.devices > 0 ? "default" : "secondary"} className="font-mono">
                            {gateway.devices}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                gateway.status === "online" ? "bg-success" : "bg-destructive"
                              }`}
                            />
                            <span className="text-sm capitalize">{gateway.status}</span>
                          </div>
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(gateway.id)}
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
    </div>
  )
}
