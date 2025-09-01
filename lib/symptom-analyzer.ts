export interface SymptomAnalysis {
  severity: "low" | "medium" | "high" | "emergency"
  possibleConditions: string[]
  recommendations: string[]
  urgencyLevel: string
  followUpQuestions?: string[]
}

export interface SymptomPattern {
  keywords: string[]
  severity: "low" | "medium" | "high" | "emergency"
  conditions: string[]
  recommendations: string[]
  urgencyLevel: string
  followUpQuestions?: string[]
}

const SYMPTOM_PATTERNS: SymptomPattern[] = [
  // Emergency symptoms
  {
    keywords: ["chest pain", "heart attack", "crushing pain", "radiating pain", "left arm pain"],
    severity: "emergency",
    conditions: ["Possible cardiac event", "Angina", "Heart attack"],
    recommendations: ["Seek immediate emergency medical attention", "Call emergency services", "Do not drive yourself"],
    urgencyLevel: "IMMEDIATE MEDICAL ATTENTION REQUIRED",
    followUpQuestions: ["Are you experiencing shortness of breath?", "Is the pain radiating to your jaw or arm?"],
  },
  {
    keywords: ["difficulty breathing", "shortness of breath", "can't breathe", "gasping"],
    severity: "emergency",
    conditions: ["Respiratory distress", "Asthma attack", "Pneumonia"],
    recommendations: ["Seek immediate medical attention", "Call emergency services if severe"],
    urgencyLevel: "URGENT - Seek immediate care",
    followUpQuestions: ["Do you have a history of asthma?", "Are your lips or fingernails blue?"],
  },
  {
    keywords: ["severe headache", "worst headache", "sudden headache", "thunderclap headache"],
    severity: "emergency",
    conditions: ["Possible stroke", "Brain hemorrhage", "Meningitis"],
    recommendations: ["Seek immediate emergency care", "Call emergency services"],
    urgencyLevel: "EMERGENCY - Call 911",
    followUpQuestions: ["Do you have neck stiffness?", "Are you experiencing vision changes?"],
  },

  // High severity symptoms
  {
    keywords: ["high fever", "fever over 103", "fever over 101", "burning up"],
    severity: "high",
    conditions: ["Severe infection", "Flu", "COVID-19", "Bacterial infection"],
    recommendations: ["Contact healthcare provider within 24 hours", "Monitor temperature regularly", "Stay hydrated"],
    urgencyLevel: "High priority - Contact doctor today",
    followUpQuestions: ["How long have you had the fever?", "Do you have any other symptoms?"],
  },
  {
    keywords: ["severe abdominal pain", "stomach pain", "sharp abdominal pain"],
    severity: "high",
    conditions: ["Appendicitis", "Gallbladder issues", "Kidney stones", "Gastroenteritis"],
    recommendations: ["Contact healthcare provider promptly", "Avoid eating until evaluated", "Monitor pain level"],
    urgencyLevel: "High priority - Seek medical evaluation",
    followUpQuestions: ["Where exactly is the pain located?", "Does the pain worsen with movement?"],
  },

  // Medium severity symptoms
  {
    keywords: ["persistent cough", "cough", "dry cough", "productive cough"],
    severity: "medium",
    conditions: ["Upper respiratory infection", "Bronchitis", "Allergies", "Common cold"],
    recommendations: [
      "Rest and stay hydrated",
      "Consider over-the-counter cough medicine",
      "See doctor if persists over 2 weeks",
    ],
    urgencyLevel: "Moderate - Monitor and seek care if worsens",
    followUpQuestions: ["Are you coughing up blood or colored mucus?", "How long have you had the cough?"],
  },
  {
    keywords: ["headache", "head pain", "migraine", "tension headache"],
    severity: "medium",
    conditions: ["Tension headache", "Migraine", "Sinus headache", "Dehydration"],
    recommendations: ["Rest in a quiet, dark room", "Stay hydrated", "Consider over-the-counter pain relief"],
    urgencyLevel: "Moderate - Self-care with monitoring",
    followUpQuestions: ["Is this a new type of headache for you?", "Do you have sensitivity to light?"],
  },
  {
    keywords: ["nausea", "vomiting", "throwing up", "sick to stomach"],
    severity: "medium",
    conditions: ["Gastroenteritis", "Food poisoning", "Viral infection", "Motion sickness"],
    recommendations: ["Stay hydrated with small sips", "Rest", "Avoid solid foods temporarily"],
    urgencyLevel: "Moderate - Monitor hydration",
    followUpQuestions: ["Are you able to keep fluids down?", "Do you have diarrhea as well?"],
  },

  // Low severity symptoms
  {
    keywords: ["runny nose", "stuffy nose", "congestion", "sneezing"],
    severity: "low",
    conditions: ["Common cold", "Allergies", "Sinusitis"],
    recommendations: ["Rest and fluids", "Saline nasal rinse", "Over-the-counter decongestants if needed"],
    urgencyLevel: "Low priority - Self-care appropriate",
    followUpQuestions: ["Do you have seasonal allergies?", "Is this accompanied by fever?"],
  },
  {
    keywords: ["sore throat", "throat pain", "scratchy throat"],
    severity: "low",
    conditions: ["Viral pharyngitis", "Strep throat", "Common cold", "Allergies"],
    recommendations: ["Warm salt water gargles", "Stay hydrated", "Throat lozenges"],
    urgencyLevel: "Low priority - Self-care with monitoring",
    followUpQuestions: ["Do you have white patches on your throat?", "Do you have swollen lymph nodes?"],
  },
  {
    keywords: ["fatigue", "tired", "exhausted", "low energy"],
    severity: "low",
    conditions: ["Viral infection", "Stress", "Poor sleep", "Dehydration"],
    recommendations: ["Ensure adequate rest", "Stay hydrated", "Maintain regular sleep schedule"],
    urgencyLevel: "Low priority - Lifestyle modifications",
    followUpQuestions: ["How long have you been feeling tired?", "Are you getting enough sleep?"],
  },
]

import { MedicalKnowledgeBase } from "./medical-knowledge-base"

export class SymptomAnalyzer {
  static analyzeSymptoms(input: string): SymptomAnalysis {
    const lowerInput = input.toLowerCase()
    const matchedPatterns: SymptomPattern[] = []

    // Check if user is asking about medication
    if (lowerInput.includes("medication") || lowerInput.includes("drug") || lowerInput.includes("medicine")) {
      const words = lowerInput.split(" ")
      for (const word of words) {
        const medicationInfo = MedicalKnowledgeBase.getMedicationInfo(word)
        if (medicationInfo) {
          return {
            severity: "low",
            possibleConditions: [`Information about ${medicationInfo.name}`],
            recommendations: [
              `${medicationInfo.name} (${medicationInfo.genericName}) is used for: ${medicationInfo.uses.join(", ")}`,
              `Common side effects: ${medicationInfo.sideEffects.join(", ")}`,
              `Dosage: ${medicationInfo.dosageInfo}`,
              ...medicationInfo.warnings.map((warning) => `⚠️ ${warning}`),
            ],
            urgencyLevel: "Medication Information",
          }
        }
      }
    }

    // Check if user is asking about first aid
    if (
      lowerInput.includes("first aid") ||
      lowerInput.includes("emergency") ||
      lowerInput.includes("choking") ||
      lowerInput.includes("burn")
    ) {
      const firstAidGuide = MedicalKnowledgeBase.getFirstAidGuide(lowerInput)
      if (firstAidGuide) {
        return {
          severity: "high",
          possibleConditions: [`First Aid: ${firstAidGuide.situation}`],
          recommendations: [
            "**Steps to follow:**",
            ...firstAidGuide.steps.map((step, index) => `${index + 1}. ${step}`),
            "**Important warnings:**",
            ...firstAidGuide.warnings.map((warning) => `⚠️ ${warning}`),
            `**When to seek help:** ${firstAidGuide.whenToSeekHelp}`,
          ],
          urgencyLevel: "FIRST AID GUIDANCE",
        }
      }
    }

    // Check if user is asking for health tips
    if (lowerInput.includes("health tip") || lowerInput.includes("prevention") || lowerInput.includes("healthy")) {
      const healthTip = MedicalKnowledgeBase.getRandomHealthTip()
      return {
        severity: "low",
        possibleConditions: [`Health Tip: ${healthTip.title}`],
        recommendations: [
          healthTip.description,
          "**Benefits:**",
          ...healthTip.benefits.map((benefit) => `• ${benefit}`),
          "**How to implement:**",
          ...healthTip.howTo.map((step) => `• ${step}`),
        ],
        urgencyLevel: "Health & Wellness Tip",
      }
    }

    // Find all matching patterns from existing system
    for (const pattern of SYMPTOM_PATTERNS) {
      const hasMatch = pattern.keywords.some((keyword) => lowerInput.includes(keyword.toLowerCase()))
      if (hasMatch) {
        matchedPatterns.push(pattern)
      }
    }

    if (matchedPatterns.length > 0) {
      // Extract symptoms from input
      const detectedSymptoms = []
      for (const pattern of matchedPatterns) {
        detectedSymptoms.push(...pattern.keywords.filter((keyword) => lowerInput.includes(keyword.toLowerCase())))
      }

      // Get matching conditions from knowledge base
      const matchingConditions = MedicalKnowledgeBase.getConditionBySymptoms(detectedSymptoms)

      if (matchingConditions.length > 0) {
        const primaryCondition = matchingConditions[0]
        const severityOrder = { emergency: 4, high: 3, medium: 2, low: 1 }
        const highestSeverity = matchedPatterns.reduce((max, pattern) =>
          severityOrder[pattern.severity] > severityOrder[max.severity] ? pattern : max,
        )

        return {
          severity: primaryCondition.severity,
          possibleConditions: matchingConditions.slice(0, 3).map((condition) => condition.name),
          recommendations: [
            ...primaryCondition.treatments.slice(0, 3).map((treatment) => `• ${treatment}`),
            "**Prevention tips:**",
            ...primaryCondition.prevention.slice(0, 2).map((prevention) => `• ${prevention}`),
            primaryCondition.specialtyRequired ? `Consider consulting: ${primaryCondition.specialtyRequired}` : "",
          ].filter(Boolean),
          urgencyLevel: highestSeverity.urgencyLevel,
          followUpQuestions: matchedPatterns.flatMap((p) => p.followUpQuestions || []).slice(0, 2),
        }
      }
    }

    if (matchedPatterns.length === 0) {
      const searchResults = MedicalKnowledgeBase.searchKnowledge(input)

      if (searchResults.conditions.length > 0 || searchResults.medications.length > 0) {
        const recommendations = []

        if (searchResults.conditions.length > 0) {
          recommendations.push("**Possible related conditions:**")
          recommendations.push(
            ...searchResults.conditions.slice(0, 2).map((condition) => `• ${condition.name}: ${condition.description}`),
          )
        }

        if (searchResults.medications.length > 0) {
          recommendations.push("**Related medications:**")
          recommendations.push(
            ...searchResults.medications.slice(0, 2).map((med) => `• ${med.name}: ${med.description}`),
          )
        }

        recommendations.push("Consider consulting with a healthcare provider for proper evaluation")

        return {
          severity: "low",
          possibleConditions: searchResults.conditions.slice(0, 2).map((c) => c.name),
          recommendations,
          urgencyLevel: "General health information provided",
        }
      }

      return {
        severity: "low",
        possibleConditions: ["General health concern"],
        recommendations: [
          "Thank you for sharing your symptoms",
          "Consider consulting with a healthcare provider for proper evaluation",
          "Monitor your symptoms and seek care if they worsen",
          "You can also ask me about specific medications, first aid, or health tips",
        ],
        urgencyLevel: "General consultation recommended",
      }
    }
  }

  static getSeverityColor(severity: "low" | "medium" | "high" | "emergency"): string {
    switch (severity) {
      case "emergency":
        return "text-red-600 bg-red-50"
      case "high":
        return "text-orange-600 bg-orange-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  static getSeverityIcon(severity: "low" | "medium" | "high" | "emergency"): string {
    switch (severity) {
      case "emergency":
        return "🚨"
      case "high":
        return "⚠️"
      case "medium":
        return "⚡"
      case "low":
        return "ℹ️"
      default:
        return "ℹ️"
    }
  }
}
