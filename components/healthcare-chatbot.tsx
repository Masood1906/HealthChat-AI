"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Heart,
  Activity,
  Clock,
  LogOut,
  Lightbulb,
  Pill,
  Shield,
  Settings,
  Moon,
  Droplets,
  Apple,
  Dumbbell,
} from "lucide-react"
import { SymptomAnalyzer, type SymptomAnalysis } from "@/lib/symptom-analyzer"
import { MedicalKnowledgeBase } from "@/lib/medical-knowledge-base"
import { useAuth } from "@/lib/auth-context"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "symptom" | "question" | "analysis" | "disclaimer" | "wellness"
  analysis?: SymptomAnalysis
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  content:
    "Hello! I'm your healthcare assistant. I can help you understand your symptoms, provide general health information, and answer wellness questions like sleep, diet, and exercise. Please describe any symptoms you're experiencing or ask me about healthy living. Remember, this is not a substitute for professional medical advice.",
  sender: "bot",
  timestamp: new Date(),
  type: "disclaimer",
}

export function HealthcareChatbot() {
  const { user, logout } = useAuth()
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (user) {
      const welcomeMessage: Message = {
        id: "welcome-" + Date.now(),
        content: `Welcome back, ${user.name}! I'm here to help you with any health concerns you may have. How are you feeling today?`,
        sender: "bot",
        timestamp: new Date(),
        type: "question",
      }

      const healthTip = MedicalKnowledgeBase.getRandomHealthTip()
      const tipMessage: Message = {
        id: "tip-" + Date.now(),
        content: `💡 **Daily Health Tip: ${healthTip.title}**\n\n${healthTip.description}\n\n**Benefits:** ${healthTip.benefits.slice(0, 2).join(", ")}\n\nYou can ask me about symptoms, medications, first aid, or wellness questions like "How much should I sleep?" or "What should I eat?"`,
        sender: "bot",
        timestamp: new Date(),
        type: "question",
      }

      setMessages((prev) => [INITIAL_MESSAGE, welcomeMessage, tipMessage])
    }
  }, [user])

  const quickActions = [
    { label: "Sleep Tips", icon: Moon, query: "How much should I sleep?" },
    { label: "Hydration", icon: Droplets, query: "How much water should I drink?" },
    { label: "Healthy Diet", icon: Apple, query: "What should I eat for a healthy diet?" },
    { label: "Exercise", icon: Dumbbell, query: "How much should I exercise?" },
    { label: "Health Tip", icon: Lightbulb, query: "Give me a health tip" },
    { label: "Medication Info", icon: Pill, query: "Tell me about medication" },
    { label: "First Aid", icon: Shield, query: "First aid guidance" },
  ]

  const handleQuickAction = (query: string) => {
    setInputValue(query)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "symptom",
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      try {
        // Check if this is a wellness question first
        const wellnessGuidance = MedicalKnowledgeBase.getWellnessGuidance(currentInput)

        if (wellnessGuidance.length > 0) {
          // Handle wellness questions
          const guide = wellnessGuidance[0]
          let responseContent = `**${guide.question}**\n\n${guide.answer}\n\n`

          if (guide.recommendations.length > 0) {
            responseContent += `**Recommendations:**\n${guide.recommendations.map((r) => `• ${r}`).join("\n")}\n\n`
          }

          if (guide.factors.length > 0) {
            responseContent += `**Factors to consider:**\n${guide.factors.map((f) => `• ${f}`).join("\n")}\n\n`
          }

          if (guide.warnings && guide.warnings.length > 0) {
            responseContent += `**Important notes:**\n${guide.warnings.map((w) => `• ${w}`).join("\n")}\n\n`
          }

          responseContent += `*This is general wellness information. Consult healthcare professionals for personalized advice.*`

          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: responseContent,
            sender: "bot",
            timestamp: new Date(),
            type: "wellness",
          }

          setMessages((prev) => [...prev, botResponse])
        } else {
          // Handle symptom analysis and other medical queries
          const analysis = SymptomAnalyzer.analyzeSymptoms(currentInput)

          let responseContent = `Based on your input, here's what I found:\n\n`

          responseContent += `**${analysis.urgencyLevel}**\n\n`

          if (analysis.possibleConditions.length > 0) {
            responseContent += `**Possible conditions:**\n${analysis.possibleConditions.map((c) => `• ${c}`).join("\n")}\n\n`
          }

          if (analysis.recommendations.length > 0) {
            responseContent += `**Recommendations:**\n${analysis.recommendations.map((r) => `• ${r}`).join("\n")}\n\n`
          }

          if (analysis.followUpQuestions && analysis.followUpQuestions.length > 0) {
            responseContent += `**Follow-up questions:**\n${analysis.followUpQuestions.map((q) => `• ${q}`).join("\n")}\n\n`
          }

          responseContent += `*Please remember: This is general information only. Always consult a healthcare professional for proper diagnosis and treatment.*`

          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: responseContent,
            sender: "bot",
            timestamp: new Date(),
            type: "analysis",
            analysis: analysis,
          }

          setMessages((prev) => [...prev, botResponse])
        }
      } catch (error) {
        console.error("Error processing query:", error)
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "I apologize, but I encountered an error while processing your question. Please try again or rephrase your question. If the problem persists, please contact support.",
          sender: "bot",
          timestamp: new Date(),
          type: "analysis",
        }
        setMessages((prev) => [...prev, errorResponse])
      } finally {
        setIsTyping(false)
      }
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessageContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index} className="font-semibold text-foreground mb-2">
            {line.slice(2, -2)}
          </p>
        )
      }
      if (line.startsWith("• ")) {
        return (
          <p key={index} className="ml-4 mb-1 text-sm">
            {line}
          </p>
        )
      }
      if (line.startsWith("*") && line.endsWith("*")) {
        return (
          <p key={index} className="text-xs text-muted-foreground italic mt-2">
            {line.slice(1, -1)}
          </p>
        )
      }
      return line ? (
        <p key={index} className="mb-2">
          {line}
        </p>
      ) : (
        <br key={index} />
      )
    })
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">HealthChat AI</h1>
            <p className="text-muted-foreground">Welcome, {user?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => window.open("/status", "_blank")} title="System Status">
            <Settings className="w-4 h-4" />
          </Button>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(action.query)}
            disabled={isTyping}
            className="flex items-center gap-2"
          >
            {React.createElement(action.icon, { className: "w-4 h-4" })}
            {action.label}
          </Button>
        ))}
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 mb-4">
        <CardContent className="p-0 h-full">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="w-8 h-8 bg-primary">
                      <AvatarFallback>
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-[80%] ${message.sender === "user" ? "order-first" : ""}`}>
                    <Card className={`${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                      <CardContent className="p-3">
                        {message.sender === "bot" && message.analysis ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className={`${SymptomAnalyzer.getSeverityColor(message.analysis.severity)} border-0`}
                              >
                                <Activity className="w-3 h-3 mr-1" />
                                {message.analysis.severity.toUpperCase()} PRIORITY
                              </Badge>
                            </div>

                            <Separator />

                            <div className="text-sm leading-relaxed">{formatMessageContent(message.content)}</div>
                          </div>
                        ) : message.type === "wellness" ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">
                                <Lightbulb className="w-3 h-3 mr-1" />
                                WELLNESS GUIDANCE
                              </Badge>
                            </div>

                            <Separator />

                            <div className="text-sm leading-relaxed">{formatMessageContent(message.content)}</div>
                          </div>
                        ) : (
                          <div className="text-sm leading-relaxed">{formatMessageContent(message.content)}</div>
                        )}

                        {message.type === "disclaimer" && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/20">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <Badge variant="secondary" className="text-xs">
                              Medical Disclaimer
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <div className="flex items-center gap-2 mt-1 px-3">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8 bg-secondary">
                      <AvatarFallback>
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 bg-primary">
                    <AvatarFallback>
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="bg-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">Analyzing your question...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about symptoms, medications, first aid, sleep, diet, exercise, or wellness tips..."
          className="flex-1"
          disabled={isTyping}
        />
        <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          This chatbot provides general health information only and is not a substitute for professional medical advice,
          diagnosis, or treatment. Always consult your healthcare provider for medical concerns.
        </p>
      </div>
    </div>
  )
}
