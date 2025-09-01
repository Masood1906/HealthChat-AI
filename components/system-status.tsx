"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SystemHealth, type SystemHealthCheck } from "@/lib/system-health"
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Activity } from "lucide-react"

export function SystemStatus() {
  const [healthChecks, setHealthChecks] = useState<SystemHealthCheck[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  const runHealthCheck = async () => {
    setIsLoading(true)
    try {
      const checks = await SystemHealth.performHealthCheck()
      setHealthChecks(checks)
      setLastCheck(new Date())
    } catch (error) {
      console.error("Health check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    runHealthCheck()
  }, [])

  const getStatusIcon = (status: "healthy" | "warning" | "error") => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusColor = (status: "healthy" | "warning" | "error") => {
    switch (status) {
      case "healthy":
        return "bg-green-50 text-green-700 border-green-200"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "error":
        return "bg-red-50 text-red-700 border-red-200"
    }
  }

  const overallHealth = healthChecks.length > 0 ? SystemHealth.getOverallHealth(healthChecks) : "healthy"

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">System Status</h1>
          <p className="text-muted-foreground">HealthChat AI System Health Dashboard</p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Overall System Health
                <Badge className={getStatusColor(overallHealth)}>
                  {getStatusIcon(overallHealth)}
                  {overallHealth.toUpperCase()}
                </Badge>
              </CardTitle>
              {lastCheck && (
                <p className="text-sm text-muted-foreground mt-1">Last checked: {lastCheck.toLocaleString()}</p>
              )}
            </div>
            <Button onClick={runHealthCheck} disabled={isLoading} size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Checking..." : "Refresh"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <p className="font-medium">{check.component}</p>
                      <p className="text-sm text-muted-foreground">{check.message}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(check.status)}>
                    {check.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Features Implemented</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✅ Healthcare-themed UI with professional design</li>
                  <li>✅ User authentication and session management</li>
                  <li>✅ Advanced symptom analysis engine</li>
                  <li>✅ Comprehensive medical knowledge base</li>
                  <li>✅ Medication information and interactions</li>
                  <li>✅ First aid guidance system</li>
                  <li>✅ Health tips and preventive care</li>
                  <li>✅ Error handling and system monitoring</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Technical Stack</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Next.js 14 with App Router</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• shadcn/ui component library</li>
                  <li>• Local storage for data persistence</li>
                  <li>• React Context for state management</li>
                  <li>• Error boundaries for fault tolerance</li>
                  <li>• Responsive design for all devices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={() => (window.location.href = "/")} size="lg">
            Return to HealthChat AI
          </Button>
        </div>
      </div>
    </div>
  )
}
