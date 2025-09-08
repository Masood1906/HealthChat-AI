import { FoodCalorieService } from "./food-calorie-database"
import { SymptomAnalyzer } from "./symptom-analyzer"
import { MedicalKnowledgeBase } from "./medical-knowledge-base"
import { FoodHealthService } from "./food-health-recommendations"

export interface ChatResponse {
  message: string
  type: "greeting" | "health" | "calorie" | "symptom" | "general" | "emergency"
  confidence: number
}

export class LocalAIService {
  private static greetingPatterns = [
    /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)$/i,
    /^(hi there|hello there|hey there)$/i,
    /^(how are you|what's up|sup)$/i,
  ]

  private static caloriePatterns = [
    /how many calories (in|does|are in) (.+)/i,
    /calories in (.+)/i,
    /(.+) calories/i,
    /calorie count for (.+)/i,
    /nutritional info for (.+)/i,
    /nutrition facts (.+)/i,
  ]

  private static healthPatterns = [
    /how much (water|sleep|exercise)/i,
    /daily (water|sleep|exercise)/i,
    /recommended (water|sleep|exercise)/i,
    /(diet|nutrition|healthy eating)/i,
    /health tip/i,
    /wellness advice/i,
    /food for (.+)/i,
    /what to eat for (.+)/i,
    /foods that help with (.+)/i,
    /natural remedy for (.+)/i,
    /diet for (.+)/i,
  ]

  static async generateResponse(message: string): Promise<ChatResponse> {
    const cleanMessage = message.trim().toLowerCase()

    // Handle greetings
    if (this.isGreeting(cleanMessage)) {
      return {
        message: this.getGreetingResponse(),
        type: "greeting",
        confidence: 0.9,
      }
    }

    // Handle calorie queries
    const calorieMatch = this.extractCalorieQuery(message)
    if (calorieMatch) {
      return {
        message: FoodCalorieService.getCalorieInfo(calorieMatch),
        type: "calorie",
        confidence: 0.85,
      }
    }

    // Handle food health recommendations
    const foodRecommendation = FoodHealthService.getFoodRecommendations(message)
    if (foodRecommendation) {
      return {
        message: foodRecommendation,
        type: "health",
        confidence: 0.85,
      }
    }

    // Handle health/wellness queries
    if (this.isHealthQuery(cleanMessage)) {
      return {
        message: this.getHealthResponse(cleanMessage),
        type: "health",
        confidence: 0.8,
      }
    }

    // Handle symptom analysis
    const symptomAnalysis = SymptomAnalyzer.analyzeSymptoms(message)
    if (symptomAnalysis.severity !== "unknown") {
      return {
        message: this.formatSymptomResponse(symptomAnalysis),
        type: symptomAnalysis.severity === "emergency" ? "emergency" : "symptom",
        confidence: 0.75,
      }
    }

    // Handle medical knowledge queries
    const medicalResponse = this.getMedicalResponse(cleanMessage)
    if (medicalResponse) {
      return {
        message: medicalResponse,
        type: "health",
        confidence: 0.7,
      }
    }

    // Default response
    return {
      message: this.getDefaultResponse(),
      type: "general",
      confidence: 0.5,
    }
  }

  private static isGreeting(message: string): boolean {
    return this.greetingPatterns.some((pattern) => pattern.test(message))
  }

  private static extractCalorieQuery(message: string): string | null {
    for (const pattern of this.caloriePatterns) {
      const match = message.match(pattern)
      if (match) {
        // Extract the food name from different capture groups
        return match[2] || match[1] || match[0]
      }
    }
    return null
  }

  private static isHealthQuery(message: string): boolean {
    return this.healthPatterns.some((pattern) => pattern.test(message))
  }

  private static getGreetingResponse(): string {
    const greetings = [
      "Hello! I'm your healthcare assistant. How can I help you today?",
      "Hi there! I'm here to help with your health questions and provide wellness guidance.",
      "Hey! I can help you with symptoms, nutrition, wellness tips, and general health information.",
      "Hello! Feel free to ask me about calories in foods, health symptoms, or wellness advice.",
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  private static getHealthResponse(message: string): string {
    if (message.includes("water")) {
      return `💧 **Daily Water Intake Recommendations:**

• **General guideline**: 8 glasses (64 oz) per day
• **Men**: About 15.5 cups (3.7 liters) daily
• **Women**: About 11.5 cups (2.7 liters) daily
• **Active individuals**: Add 12-16 oz for every hour of exercise
• **Hot weather**: Increase intake by 16-24 oz

**Tips:**
• Drink water before you feel thirsty
• Monitor urine color (pale yellow is ideal)
• Include water-rich foods like fruits and vegetables`
    }

    if (message.includes("sleep")) {
      return `😴 **Sleep Recommendations:**

• **Adults (18-64)**: 7-9 hours per night
• **Older adults (65+)**: 7-8 hours per night
• **Teenagers**: 8-10 hours per night

**For Better Sleep:**
• Maintain consistent sleep schedule
• Create a relaxing bedtime routine
• Keep bedroom cool, dark, and quiet
• Avoid screens 1 hour before bed
• Limit caffeine after 2 PM
• Get natural sunlight during the day`
    }

    if (message.includes("exercise")) {
      return `🏃‍♂️ **Exercise Recommendations:**

• **Aerobic activity**: 150 minutes moderate OR 75 minutes vigorous per week
• **Strength training**: 2+ days per week (all major muscle groups)
• **Daily movement**: At least 10,000 steps

**Types of Exercise:**
• Moderate: Brisk walking, swimming, cycling
• Vigorous: Running, HIIT, competitive sports
• Strength: Weight lifting, resistance bands, bodyweight exercises

**Start gradually** and increase intensity over time!`
    }

    if (message.includes("diet") || message.includes("nutrition")) {
      return `🥗 **Healthy Diet Guidelines:**

**Daily Servings:**
• Vegetables: 5-9 servings
• Fruits: 2-4 servings
• Whole grains: 6-8 servings
• Lean protein: 2-3 servings
• Healthy fats: 2-3 servings

**Key Principles:**
• Eat a variety of colorful foods
• Choose whole foods over processed
• Control portion sizes
• Stay hydrated
• Limit added sugars and sodium
• Include healthy fats (nuts, olive oil, avocado)`
    }

    return this.getRandomHealthTip()
  }

  private static getRandomHealthTip(): string {
    const tips = [
      "🌟 **Health Tip**: Take a 10-minute walk after meals to help with digestion and blood sugar control.",
      "🌟 **Wellness Tip**: Practice deep breathing for 5 minutes daily to reduce stress and improve focus.",
      "🌟 **Nutrition Tip**: Fill half your plate with vegetables and fruits for optimal nutrition.",
      "🌟 **Sleep Tip**: Keep your bedroom temperature between 60-67°F for better sleep quality.",
      "🌟 **Hydration Tip**: Start your day with a glass of water to kickstart your metabolism.",
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  private static getMedicalResponse(message: string): string | null {
    // Check for medication queries
    if (message.includes("medication") || message.includes("medicine") || message.includes("drug")) {
      return `💊 **Medication Safety:**

• Always follow prescribed dosages
• Take medications at the same time daily
• Don't stop medications without consulting your doctor
• Be aware of potential side effects
• Keep a list of all medications you take
• Store medications properly (cool, dry place)

**⚠️ Important**: Never share medications or take expired drugs. Consult your healthcare provider for specific medication questions.`
    }

    // Check for first aid queries
    if (message.includes("first aid") || message.includes("emergency")) {
      return MedicalKnowledgeBase.getFirstAidInfo("general")
    }

    return null
  }

  private static formatSymptomResponse(analysis: any): string {
    let response = `🏥 **Symptom Analysis**\n\n`
    response += `**Severity**: ${analysis.severity.toUpperCase()}\n`
    response += `**Possible Conditions**: ${analysis.possibleConditions.join(", ")}\n\n`
    response += `**Recommendations**:\n`
    analysis.recommendations.forEach((rec: string) => {
      response += `• ${rec}\n`
    })

    if (analysis.severity === "emergency") {
      response += `\n🚨 **EMERGENCY**: Seek immediate medical attention!`
    }

    response += `\n\n⚠️ **Disclaimer**: This is not a substitute for professional medical advice.`
    return response
  }

  private static getDefaultResponse(): string {
    return `I'm here to help with your health questions! You can ask me about:

• **Calories**: "How many calories in an apple?"
• **Symptoms**: "I have a headache and fever"
• **Wellness**: "How much water should I drink?"
• **Nutrition**: "What's a healthy diet?"
• **Sleep**: "How much sleep do I need?"
• **Exercise**: "How much should I exercise?"
• **Food Recommendations**: "Food for a healthy heart"

What would you like to know?`
  }

  static async generateHealthTip(): Promise<string> {
    const tipType = Math.random()

    if (tipType < 0.5) {
      return FoodHealthService.getRandomFoodTip()
    } else {
      const healthyFood = FoodCalorieService.getRandomHealthyFood()
      return `🍎 **Daily Health Tip**: Try adding ${healthyFood.name} to your diet! It contains ${healthyFood.calories} calories per ${healthyFood.serving} and is packed with nutrients. ${healthyFood.category === "fruit" ? "Fruits" : "Vegetables"} are essential for a balanced diet.`
    }
  }
}
