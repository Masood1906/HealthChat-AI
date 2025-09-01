export interface SystemHealthCheck {
  component: string
  status: "healthy" | "warning" | "error"
  message: string
  timestamp: Date
}

export class SystemHealth {
  static async performHealthCheck(): Promise<SystemHealthCheck[]> {
    const checks: SystemHealthCheck[] = []

    // Check localStorage availability
    try {
      localStorage.setItem("health_check", "test")
      localStorage.removeItem("health_check")
      checks.push({
        component: "Local Storage",
        status: "healthy",
        message: "Local storage is available",
        timestamp: new Date(),
      })
    } catch (error) {
      checks.push({
        component: "Local Storage",
        status: "error",
        message: "Local storage is not available",
        timestamp: new Date(),
      })
    }

    // Check authentication system
    try {
      const savedUsers = JSON.parse(localStorage.getItem("healthchat_users") || "[]")
      checks.push({
        component: "Authentication",
        status: "healthy",
        message: `Authentication system operational (${savedUsers.length} users)`,
        timestamp: new Date(),
      })
    } catch (error) {
      checks.push({
        component: "Authentication",
        status: "warning",
        message: "Authentication system has issues",
        timestamp: new Date(),
      })
    }

    // Check symptom analyzer
    try {
      const { SymptomAnalyzer } = await import("./symptom-analyzer")
      const testAnalysis = SymptomAnalyzer.analyzeSymptoms("test headache")
      if (testAnalysis && testAnalysis.severity) {
        checks.push({
          component: "Symptom Analyzer",
          status: "healthy",
          message: "Symptom analysis engine is working",
          timestamp: new Date(),
        })
      } else {
        throw new Error("Invalid analysis result")
      }
    } catch (error) {
      checks.push({
        component: "Symptom Analyzer",
        status: "error",
        message: "Symptom analyzer is not working properly",
        timestamp: new Date(),
      })
    }

    // Check medical knowledge base
    try {
      const { MedicalKnowledgeBase } = await import("./medical-knowledge-base")
      const searchResults = MedicalKnowledgeBase.searchKnowledge("headache")
      if (searchResults && (searchResults.conditions.length > 0 || searchResults.medications.length > 0)) {
        checks.push({
          component: "Medical Knowledge Base",
          status: "healthy",
          message: "Medical knowledge base is accessible",
          timestamp: new Date(),
        })
      } else {
        checks.push({
          component: "Medical Knowledge Base",
          status: "warning",
          message: "Medical knowledge base returned no results",
          timestamp: new Date(),
        })
      }
    } catch (error) {
      checks.push({
        component: "Medical Knowledge Base",
        status: "error",
        message: "Medical knowledge base is not accessible",
        timestamp: new Date(),
      })
    }

    return checks
  }

  static getOverallHealth(checks: SystemHealthCheck[]): "healthy" | "warning" | "error" {
    if (checks.some((check) => check.status === "error")) {
      return "error"
    }
    if (checks.some((check) => check.status === "warning")) {
      return "warning"
    }
    return "healthy"
  }
}
