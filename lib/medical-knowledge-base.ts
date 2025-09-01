export interface MedicalCondition {
  id: string
  name: string
  description: string
  symptoms: string[]
  causes: string[]
  treatments: string[]
  prevention: string[]
  severity: "low" | "medium" | "high" | "emergency"
  specialtyRequired?: string
}

export interface Medication {
  id: string
  name: string
  genericName: string
  description: string
  uses: string[]
  sideEffects: string[]
  interactions: string[]
  dosageInfo: string
  warnings: string[]
}

export interface FirstAidGuide {
  id: string
  situation: string
  steps: string[]
  warnings: string[]
  whenToSeekHelp: string
}

export interface HealthTip {
  id: string
  category: string
  title: string
  description: string
  benefits: string[]
  howTo: string[]
}

export interface WellnessGuide {
  id: string
  category: string
  question: string
  answer: string
  recommendations: string[]
  factors: string[]
  warnings?: string[]
}

export class MedicalKnowledgeBase {
  private static conditions: MedicalCondition[] = [
    {
      id: "common-cold",
      name: "Common Cold",
      description: "A viral infection of the upper respiratory tract",
      symptoms: ["runny nose", "stuffy nose", "sneezing", "sore throat", "mild headache", "low-grade fever"],
      causes: ["Rhinovirus", "Coronavirus", "Respiratory syncytial virus"],
      treatments: ["Rest", "Fluids", "Over-the-counter pain relievers", "Throat lozenges", "Saline nasal spray"],
      prevention: [
        "Frequent handwashing",
        "Avoid close contact with sick people",
        "Don't touch face",
        "Get adequate sleep",
      ],
      severity: "low",
    },
    {
      id: "influenza",
      name: "Influenza (Flu)",
      description: "A viral infection that attacks the respiratory system",
      symptoms: ["high fever", "body aches", "fatigue", "headache", "dry cough", "sore throat"],
      causes: ["Influenza A virus", "Influenza B virus"],
      treatments: ["Antiviral medications", "Rest", "Fluids", "Fever reducers"],
      prevention: ["Annual flu vaccine", "Frequent handwashing", "Avoid crowds during flu season"],
      severity: "medium",
      specialtyRequired: "Primary Care",
    },
    {
      id: "migraine",
      name: "Migraine Headache",
      description: "A neurological condition causing severe headaches",
      symptoms: ["severe headache", "nausea", "vomiting", "sensitivity to light", "sensitivity to sound"],
      causes: ["Genetics", "Hormonal changes", "Stress", "Certain foods", "Sleep changes"],
      treatments: ["Triptans", "Pain relievers", "Anti-nausea medications", "Rest in dark room"],
      prevention: ["Identify triggers", "Regular sleep schedule", "Stress management", "Stay hydrated"],
      severity: "medium",
      specialtyRequired: "Neurology",
    },
    {
      id: "heart-attack",
      name: "Heart Attack (Myocardial Infarction)",
      description: "Blockage of blood flow to the heart muscle",
      symptoms: ["chest pain", "shortness of breath", "nausea", "sweating", "pain radiating to arm"],
      causes: ["Coronary artery disease", "Blood clots", "Atherosclerosis"],
      treatments: ["Emergency medical care", "Aspirin", "Clot-busting drugs", "Angioplasty"],
      prevention: ["Healthy diet", "Regular exercise", "Don't smoke", "Manage stress"],
      severity: "emergency",
      specialtyRequired: "Cardiology",
    },
    {
      id: "pneumonia",
      name: "Pneumonia",
      description: "Infection that inflames air sacs in lungs",
      symptoms: ["cough with phlegm", "fever", "chills", "difficulty breathing", "chest pain"],
      causes: ["Bacteria", "Viruses", "Fungi"],
      treatments: ["Antibiotics", "Rest", "Fluids", "Oxygen therapy if severe"],
      prevention: ["Vaccination", "Good hygiene", "Healthy lifestyle", "Avoid smoking"],
      severity: "high",
      specialtyRequired: "Pulmonology",
    },
  ]

  private static medications: Medication[] = [
    {
      id: "acetaminophen",
      name: "Tylenol",
      genericName: "Acetaminophen",
      description: "Pain reliever and fever reducer",
      uses: ["Pain relief", "Fever reduction", "Headaches", "Muscle aches"],
      sideEffects: ["Nausea", "Stomach pain", "Loss of appetite", "Rash"],
      interactions: ["Warfarin", "Alcohol", "Phenytoin"],
      dosageInfo: "Adults: 325-650mg every 4-6 hours, max 3000mg/day",
      warnings: ["Do not exceed recommended dose", "Avoid alcohol", "Check other medications for acetaminophen"],
    },
    {
      id: "ibuprofen",
      name: "Advil/Motrin",
      genericName: "Ibuprofen",
      description: "Nonsteroidal anti-inflammatory drug (NSAID)",
      uses: ["Pain relief", "Inflammation reduction", "Fever reduction"],
      sideEffects: ["Stomach upset", "Heartburn", "Dizziness", "Rash"],
      interactions: ["Blood thinners", "ACE inhibitors", "Lithium"],
      dosageInfo: "Adults: 200-400mg every 4-6 hours, max 1200mg/day",
      warnings: ["Take with food", "Avoid if allergic to NSAIDs", "May increase bleeding risk"],
    },
  ]

  private static firstAidGuides: FirstAidGuide[] = [
    {
      id: "choking",
      situation: "Choking",
      steps: [
        "Encourage coughing if person can still cough",
        "Give 5 back blows between shoulder blades",
        "Give 5 abdominal thrusts (Heimlich maneuver)",
        "Alternate between back blows and abdominal thrusts",
        "Continue until object is expelled or person becomes unconscious",
      ],
      warnings: ["Do not perform on pregnant women or infants", "Use chest thrusts for pregnant women"],
      whenToSeekHelp: "Call 911 immediately if person becomes unconscious or cannot breathe",
    },
    {
      id: "burns",
      situation: "Burns",
      steps: [
        "Remove from heat source",
        "Cool burn with cool (not cold) water for 10-20 minutes",
        "Remove jewelry/clothing before swelling occurs",
        "Cover with sterile gauze",
        "Take over-the-counter pain medication if needed",
      ],
      warnings: ["Do not use ice", "Do not apply butter or oils", "Do not break blisters"],
      whenToSeekHelp: "Seek medical attention for burns larger than 3 inches, on face/hands/genitals, or if severe",
    },
  ]

  private static healthTips: HealthTip[] = [
    {
      id: "hydration",
      category: "General Health",
      title: "Stay Properly Hydrated",
      description: "Adequate hydration is essential for optimal body function",
      benefits: [
        "Improved energy",
        "Better skin health",
        "Enhanced cognitive function",
        "Better temperature regulation",
      ],
      howTo: [
        "Drink 8-10 glasses of water daily",
        "Eat water-rich foods",
        "Monitor urine color",
        "Increase intake during exercise",
      ],
    },
    {
      id: "sleep-hygiene",
      category: "Mental Health",
      title: "Practice Good Sleep Hygiene",
      description: "Quality sleep is crucial for physical and mental health",
      benefits: ["Better immune function", "Improved mood", "Enhanced memory", "Better weight management"],
      howTo: [
        "Maintain consistent sleep schedule",
        "Create relaxing bedtime routine",
        "Keep bedroom cool and dark",
        "Avoid screens before bed",
      ],
    },
  ]

  private static wellnessGuides: WellnessGuide[] = [
    {
      id: "sleep-duration",
      category: "Sleep",
      question: "How much should I sleep?",
      answer: "Most adults need 7-9 hours of quality sleep per night for optimal health and functioning.",
      recommendations: [
        "Adults (18-64): 7-9 hours per night",
        "Older adults (65+): 7-8 hours per night",
        "Teenagers: 8-10 hours per night",
        "Maintain consistent sleep schedule",
        "Create a relaxing bedtime routine",
      ],
      factors: [
        "Age and life stage",
        "Physical activity level",
        "Health conditions",
        "Stress levels",
        "Individual variation",
      ],
      warnings: ["Chronic sleep deprivation increases risk of diabetes, heart disease, and depression"],
    },
    {
      id: "water-intake",
      category: "Hydration",
      question: "How much water should I drink?",
      answer: "The general recommendation is about 8 glasses (64 ounces) of water daily, but individual needs vary.",
      recommendations: [
        "Men: About 15.5 cups (3.7 liters) of fluids daily",
        "Women: About 11.5 cups (2.7 liters) of fluids daily",
        "Increase intake during exercise or hot weather",
        "Include water-rich foods in your diet",
        "Monitor urine color (pale yellow is ideal)",
      ],
      factors: [
        "Physical activity level",
        "Climate and temperature",
        "Overall health status",
        "Pregnancy or breastfeeding",
        "Age and body size",
      ],
      warnings: ["Excessive water intake can lead to water intoxication", "Dark urine may indicate dehydration"],
    },
    {
      id: "balanced-diet",
      category: "Nutrition",
      question: "What should I eat for a healthy diet?",
      answer:
        "A balanced diet includes a variety of foods from all food groups, emphasizing whole foods and limiting processed items.",
      recommendations: [
        "Fill half your plate with fruits and vegetables",
        "Choose whole grains over refined grains",
        "Include lean proteins (fish, poultry, beans, nuts)",
        "Limit saturated fats and added sugars",
        "Eat a variety of colorful foods",
        "Control portion sizes",
      ],
      factors: [
        "Age and gender",
        "Activity level",
        "Health conditions",
        "Cultural preferences",
        "Food allergies or intolerances",
      ],
      warnings: [
        "Extreme diets can lead to nutrient deficiencies",
        "Consult healthcare provider for specific dietary needs",
      ],
    },
    {
      id: "exercise-frequency",
      category: "Exercise",
      question: "How much should I exercise?",
      answer:
        "Adults should aim for at least 150 minutes of moderate-intensity aerobic activity per week, plus muscle-strengthening activities.",
      recommendations: [
        "150 minutes moderate aerobic activity per week",
        "OR 75 minutes vigorous aerobic activity per week",
        "Muscle-strengthening activities 2+ days per week",
        "Include flexibility and balance exercises",
        "Start slowly and gradually increase intensity",
      ],
      factors: [
        "Current fitness level",
        "Age and health status",
        "Personal goals",
        "Available time",
        "Physical limitations",
      ],
      warnings: [
        "Consult doctor before starting new exercise program",
        "Stop if you experience chest pain or severe shortness of breath",
      ],
    },
    {
      id: "stress-management",
      category: "Mental Health",
      question: "How can I manage stress better?",
      answer: "Effective stress management involves identifying triggers and developing healthy coping strategies.",
      recommendations: [
        "Practice deep breathing or meditation",
        "Regular physical exercise",
        "Maintain social connections",
        "Get adequate sleep",
        "Set realistic goals and priorities",
        "Consider professional counseling if needed",
      ],
      factors: [
        "Stress triggers and sources",
        "Personal coping style",
        "Support system availability",
        "Work-life balance",
        "Overall health status",
      ],
      warnings: [
        "Chronic stress can lead to serious health problems",
        "Seek professional help for persistent anxiety or depression",
      ],
    },
    {
      id: "screen-time",
      category: "Digital Health",
      question: "How much screen time is healthy?",
      answer:
        "While there's no universal limit for adults, excessive screen time can impact sleep, posture, and eye health.",
      recommendations: [
        "Take breaks every 20 minutes (20-20-20 rule)",
        "Limit recreational screen time to 2 hours daily",
        "Avoid screens 1 hour before bedtime",
        "Use proper lighting and positioning",
        "Blink frequently to prevent dry eyes",
      ],
      factors: [
        "Work requirements",
        "Age and development stage",
        "Type of screen activity",
        "Time of day",
        "Individual sensitivity",
      ],
      warnings: ["Blue light exposure can disrupt sleep patterns", "Poor posture can lead to neck and back problems"],
    },
    {
      id: "vitamin-supplements",
      category: "Nutrition",
      question: "Do I need vitamin supplements?",
      answer:
        "Most people can get necessary nutrients from a balanced diet, but some may benefit from specific supplements.",
      recommendations: [
        "Focus on getting nutrients from whole foods first",
        "Consider Vitamin D if limited sun exposure",
        "B12 supplement for vegetarians/vegans",
        "Folic acid for women of childbearing age",
        "Consult healthcare provider before starting supplements",
      ],
      factors: [
        "Dietary restrictions",
        "Geographic location",
        "Age and life stage",
        "Health conditions",
        "Medication interactions",
      ],
      warnings: ["Some vitamins can be toxic in large doses", "Supplements can interact with medications"],
    },
  ]

  static getConditionBySymptoms(symptoms: string[]): MedicalCondition[] {
    return this.conditions
      .filter((condition) =>
        symptoms.some((symptom) =>
          condition.symptoms.some(
            (conditionSymptom) =>
              conditionSymptom.toLowerCase().includes(symptom.toLowerCase()) ||
              symptom.toLowerCase().includes(conditionSymptom.toLowerCase()),
          ),
        ),
      )
      .sort((a, b) => {
        const severityOrder = { emergency: 4, high: 3, medium: 2, low: 1 }
        return severityOrder[b.severity] - severityOrder[a.severity]
      })
  }

  static getMedicationInfo(medicationName: string): Medication | null {
    return (
      this.medications.find(
        (med) =>
          med.name.toLowerCase().includes(medicationName.toLowerCase()) ||
          med.genericName.toLowerCase().includes(medicationName.toLowerCase()),
      ) || null
    )
  }

  static getFirstAidGuide(situation: string): FirstAidGuide | null {
    return this.firstAidGuides.find((guide) => guide.situation.toLowerCase().includes(situation.toLowerCase())) || null
  }

  static getHealthTips(category?: string): HealthTip[] {
    if (category) {
      return this.healthTips.filter((tip) => tip.category.toLowerCase().includes(category.toLowerCase()))
    }
    return this.healthTips
  }

  static getWellnessGuidance(query: string): WellnessGuide[] {
    const lowerQuery = query.toLowerCase()
    return this.wellnessGuides.filter(
      (guide) =>
        guide.question.toLowerCase().includes(lowerQuery) ||
        guide.category.toLowerCase().includes(lowerQuery) ||
        guide.answer.toLowerCase().includes(lowerQuery) ||
        guide.recommendations.some((rec) => rec.toLowerCase().includes(lowerQuery)),
    )
  }

  static searchKnowledge(query: string): {
    conditions: MedicalCondition[]
    medications: Medication[]
    firstAid: FirstAidGuide[]
    healthTips: HealthTip[]
    wellness: WellnessGuide[]
  } {
    const lowerQuery = query.toLowerCase()

    return {
      conditions: this.conditions.filter(
        (condition) =>
          condition.name.toLowerCase().includes(lowerQuery) ||
          condition.description.toLowerCase().includes(lowerQuery) ||
          condition.symptoms.some((symptom) => symptom.toLowerCase().includes(lowerQuery)),
      ),
      medications: this.medications.filter(
        (med) =>
          med.name.toLowerCase().includes(lowerQuery) ||
          med.genericName.toLowerCase().includes(lowerQuery) ||
          med.uses.some((use) => use.toLowerCase().includes(lowerQuery)),
      ),
      firstAid: this.firstAidGuides.filter((guide) => guide.situation.toLowerCase().includes(lowerQuery)),
      healthTips: this.healthTips.filter(
        (tip) => tip.title.toLowerCase().includes(lowerQuery) || tip.description.toLowerCase().includes(lowerQuery),
      ),
      wellness: this.getWellnessGuidance(query),
    }
  }

  static getRandomHealthTip(): HealthTip {
    return this.healthTips[Math.floor(Math.random() * this.healthTips.length)]
  }
}
