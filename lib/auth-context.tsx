"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("healthchat_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("healthchat_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation - in a real app, this would be server-side
    const savedUsers = JSON.parse(localStorage.getItem("healthchat_users") || "[]")
    const existingUser = savedUsers.find((u: any) => u.email === email && u.password === password)

    if (existingUser) {
      const user: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        createdAt: new Date(existingUser.createdAt),
      }
      setUser(user)
      localStorage.setItem("healthchat_user", JSON.stringify(user))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation - in a real app, this would be server-side
    const savedUsers = JSON.parse(localStorage.getItem("healthchat_users") || "[]")
    const existingUser = savedUsers.find((u: any) => u.email === email)

    if (existingUser) {
      setIsLoading(false)
      return false // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In a real app, this would be hashed
      name,
      createdAt: new Date().toISOString(),
    }

    savedUsers.push(newUser)
    localStorage.setItem("healthchat_users", JSON.stringify(savedUsers))

    const user: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: new Date(newUser.createdAt),
    }

    setUser(user)
    localStorage.setItem("healthchat_user", JSON.stringify(user))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("healthchat_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
