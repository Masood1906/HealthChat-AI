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
  Lightbulb,
  Pill,
  Shield,
  Settings,
  Moon,
  Droplets,
  Apple,
  Dumbbell,
  Sparkles,
} from "lucide-react"
import { AIHealthService, type AIHealthResponse } from "@/lib/ai-health-service"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "symptom" | "question" | "analysis" | "disclaimer" | "wellness" | "emergency" | "medical"
  aiResponse?: AIHealthResponse
  confidence?: number
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  content:
    "Hello! I'm your AI-powered healthcare assistant. I can help you understand your symptoms, provide personalized health guidance, and answer wellness questions about sleep, diet, exercise, and more. I use advanced AI to provide more natural, conversational responses. Please describe any symptoms you're experiencing or ask me about healthy living. Remember, this is not a substitute for professional medical advice.",
  sender: "bot",
  timestamp: new Date(),
  type: "disclaimer",
}

export function HealthcareChatbot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<string[]>([])
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
    const welcomeMessage: Message = {
      id: "welcome-" + Date.now(),
      content: `Welcome to HealthChat AI! I'm your AI healthcare assistant, powered by advanced language models to provide personalized and conversational health guidance. How are you feeling today?`,
      sender: "bot",
      timestamp: new Date(),
      type: "question",
    }

    AIHealthService.generateHealthTip().then((tip) => {
      const tipMessage: Message = {
        id: "tip-" + Date.now(),
        content: `💡 **AI-Generated Health Tip:**\n\n${tip}\n\nFeel free to ask me about symptoms, medications, first aid, or wellness questions like "How much should I sleep?" or "What's a healthy diet for me?"`,
        sender: "bot",
        timestamp: new Date(),
        type: "question",
      }
      setMessages((prev) => [INITIAL_MESSAGE, welcomeMessage, tipMessage])
    })
  }, [])

  const quickActions = [
    { label: "Sleep Advice", icon: Moon, query: "How much should I sleep and what affects sleep quality?" },
    { label: "Hydration Guide", icon: Droplets, query: "How much water should I drink daily?" },
    { label: "Nutrition Tips", icon: Apple, query: "What should I eat for optimal health?" },
    { label: "Exercise Plan", icon: Dumbbell, query: "How much should I exercise weekly?" },
    { label: "AI Health Tip", icon: Sparkles, query: "Give me a personalized health tip" },
    { label: "Medication Help", icon: Pill, query: "I need help with medication information" },
    { label: "First Aid", icon: Shield, query: "I need first aid guidance" },
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

    setConversationHistory((prev) => [...prev, `User: ${currentInput}`])

    try {
      const aiResponse = await AIHealthService.generateResponse(currentInput, conversationHistory)

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: "bot",
        timestamp: new Date(),
        type: aiResponse.type,
        aiResponse: aiResponse,
        confidence: aiResponse.confidence,
      }

      setMessages((prev) => [...prev, botResponse])

      setConversationHistory((prev) => [...prev, `Assistant: ${aiResponse.content}`])
    } catch (error) {
      console.error("Error processing query:", error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I encountered an error while processing your question. This might be due to high demand on our AI systems. Please try again in a moment, or rephrase your question. If the problem persists, please contact support.",
        sender: "bot",
        timestamp: new Date(),
        type: "analysis",
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
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
      if (line.startsWith("• ") || line.startsWith("- ")) {
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

  const getResponseTypeBadge = (type: string, confidence?: number) => {
    switch (type) {
      case "emergency":
        return { color: "bg-red-100 text-red-800", icon: AlertTriangle, label: "EMERGENCY" }
      case "symptom":
        return { color: "bg-orange-100 text-orange-800", icon: Activity, label: "SYMPTOM ANALYSIS" }
      case "wellness":
        return { color: "bg-blue-100 text-blue-800", icon: Lightbulb, label: "WELLNESS GUIDANCE" }
      case "medical":
        return { color: "bg-green-100 text-green-800", icon: Heart, label: "MEDICAL INFO" }
      default:
        return { color: "bg-gray-100 text-gray-800", icon: Bot, label: "AI RESPONSE" }
    }
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
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              HealthChat AI
              <Sparkles className="w-5 h-5 text-primary" />
            </h1>
            <p className="text-muted-foreground">AI-Powered Healthcare Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => window.open("/status", "_blank")} title="System Status">
            <Settings className="w-4 h-4" />
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
                        {message.sender === "bot" && message.aiResponse ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              {(() => {
                                const badge = getResponseTypeBadge(message.aiResponse.type, message.confidence)
                                return (
                                  <Badge variant="secondary" className={`${badge.color} border-0`}>
                                    {React.createElement(badge.icon, { className: "w-3 h-3 mr-1" })}
                                    {badge.label}
                                  </Badge>
                                )
                              })()}

                              {message.confidence && (
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(message.confidence * 100)}% Confidence
                                </Badge>
                              )}
                            </div>

                            <Separator />

                            <div className="text-sm leading-relaxed">{formatMessageContent(message.content)}</div>

                            {message.aiResponse.followUpQuestions &&
                              message.aiResponse.followUpQuestions.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-border/20">
                                  <p className="text-xs font-medium text-muted-foreground mb-2">Follow-up questions:</p>
                                  <div className="space-y-1">
                                    {message.aiResponse.followUpQuestions.map((question, idx) => (
                                      <p key={idx} className="text-xs text-muted-foreground">
                                        • {question}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        ) : (
                          <div className="text-sm leading-relaxed">{formatMessageContent(message.content)}</div>
                        )}

                        {message.type === "disclaimer" && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/20">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <Badge variant="secondary" className="text-xs">
                              AI Medical Assistant
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
                        <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
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
          placeholder="Ask me anything about your health, symptoms, wellness, or get personalized advice..."
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
          This AI-powered chatbot provides general health information and is not a substitute for professional medical
          advice, diagnosis, or treatment. Always consult your healthcare provider for medical concerns. AI responses
          are generated using advanced language models but should not replace professional medical consultation.
        </p>
      </div>
    </div>
  )
}
