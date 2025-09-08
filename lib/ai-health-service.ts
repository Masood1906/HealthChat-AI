import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export interface AIHealthResponse {
  content: string
  type: "symptom" | "wellness" | "medical" | "emergency"
  confidence: number
  followUpQuestions?: string[]
}

export class AIHealthService {
  private static readonly SYSTEM_PROMPT =
    `You are a professional healthcare AI assistant with extensive medical knowledge. Your role is to:

1. Analyze symptoms and provide helpful guidance
2. Answer wellness questions about sleep, diet, exercise, hydration
3. Provide medication information and first aid guidance
4. Detect emergency situations and recommend immediate medical attention

IMPORTANT GUIDELINES:
- Always emphasize that you're not a replacement for professional medical advice
- For emergency symptoms (chest pain, difficulty breathing, severe bleeding, loss of consciousness), immediately recommend calling emergency services
- Provide clear, actionable advice while being empathetic
- Ask relevant follow-up questions to better understand the situation
- Use a caring, professional tone
- Structure responses with clear sections when appropriate

Response format should be conversational and helpful, not robotic.`

  static async generateResponse(userMessage: string, conversationHistory: string[] = []): Promise<AIHealthResponse> {
    try {
      // Build conversation context
      const context =
        conversationHistory.length > 0
          ? `Previous conversation:\n${conversationHistory.slice(-4).join("\n")}\n\nCurrent question: ${userMessage}`
          : userMessage

      const { text } = await generateText({
        model: groq("llama3-70b-8192"),
        system: this.SYSTEM_PROMPT,
        prompt: context,
        maxTokens: 800,
        temperature: 0.7,
      })

      // Analyze response type and confidence
      const responseType = this.determineResponseType(userMessage, text)
      const confidence = this.calculateConfidence(userMessage, text)
      const followUpQuestions = this.extractFollowUpQuestions(text)

      return {
        content: text,
        type: responseType,
        confidence,
        followUpQuestions,
      }
    } catch (error) {
      console.error("AI Health Service Error:", error)
      throw new Error("Unable to process your request at this time. Please try again.")
    }
  }

  private static determineResponseType(userMessage: string, aiResponse: string): AIHealthResponse["type"] {
    const emergencyKeywords = ["emergency", "call 911", "immediate", "urgent", "hospital", "ambulance"]
    const symptomKeywords = ["pain", "hurt", "ache", "symptom", "feel", "sick", "fever"]
    const wellnessKeywords = ["sleep", "diet", "exercise", "water", "healthy", "wellness", "nutrition"]

    const lowerMessage = userMessage.toLowerCase()
    const lowerResponse = aiResponse.toLowerCase()

    if (emergencyKeywords.some((keyword) => lowerResponse.includes(keyword))) {
      return "emergency"
    }
    if (wellnessKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return "wellness"
    }
    if (symptomKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return "symptom"
    }

    return "medical"
  }

  private static calculateConfidence(userMessage: string, aiResponse: string): number {
    // Simple confidence calculation based on response length and specificity
    const responseLength = aiResponse.length
    const hasSpecificAdvice = aiResponse.includes("recommend") || aiResponse.includes("suggest")
    const hasFollowUp = aiResponse.includes("?")

    let confidence = 0.7 // Base confidence

    if (responseLength > 200) confidence += 0.1
    if (hasSpecificAdvice) confidence += 0.1
    if (hasFollowUp) confidence += 0.1

    return Math.min(confidence, 0.95) // Cap at 95%
  }

  private static extractFollowUpQuestions(aiResponse: string): string[] {
    const questions = aiResponse.match(/[^.!?]*\?/g) || []
    return questions
      .map((q) => q.trim())
      .filter((q) => q.length > 10 && q.length < 100)
      .slice(0, 3) // Limit to 3 questions
  }

  static async generateHealthTip(): Promise<string> {
    try {
      const { text } = await generateText({
        model: groq("llama3-8b-8192"),
        system: "You are a health and wellness expert. Provide practical, actionable health tips.",
        prompt: "Generate a helpful daily health tip that people can easily implement. Keep it concise and motivating.",
        maxTokens: 200,
        temperature: 0.8,
      })

      return text
    } catch (error) {
      console.error("Error generating health tip:", error)
      return "Stay hydrated! Aim for 8 glasses of water daily to support your body's vital functions and maintain energy levels."
    }
  }
}
