"use client"

import { AuthProvider, useAuth } from "@/lib/auth-context"
import { AuthForm } from "@/components/auth-form"
import { HealthcareChatbot } from "@/components/healthcare-chatbot"

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return user ? <HealthcareChatbot /> : <AuthForm />
}

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen bg-background">
        <AppContent />
      </main>
    </AuthProvider>
  )
}
