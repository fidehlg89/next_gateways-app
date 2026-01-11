import { Router } from "lucide-react"

export default function GatewayHeader() {
    return (
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
    )
}
