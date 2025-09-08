export interface HealthFoodRecommendation {
  condition: string
  foods: {
    name: string
    benefit: string
    howToUse: string
  }[]
  explanation: string
}

export class FoodHealthService {
  private static healthFoodMap: Record<string, HealthFoodRecommendation> = {
    dehydration: {
      condition: "Dehydration",
      foods: [
        {
          name: "Lemon Water",
          benefit: "Provides electrolytes and vitamin C",
          howToUse: "Add fresh lemon juice to water, drink throughout the day",
        },
        {
          name: "Coconut Water",
          benefit: "Natural electrolytes and potassium",
          howToUse: "Drink 1-2 cups daily, especially after exercise",
        },
        {
          name: "Watermelon",
          benefit: "92% water content plus vitamins",
          howToUse: "Eat fresh slices or blend into smoothies",
        },
        {
          name: "Cucumber",
          benefit: "High water content and cooling effect",
          howToUse: "Add to water, eat in salads, or make cucumber juice",
        },
      ],
      explanation: "These foods help restore fluid balance and provide essential electrolytes.",
    },
    "vitamin c deficiency": {
      condition: "Vitamin C Deficiency",
      foods: [
        {
          name: "Oranges",
          benefit: "High vitamin C content (70mg per orange)",
          howToUse: "Eat 1-2 fresh oranges daily or drink fresh orange juice",
        },
        {
          name: "Bell Peppers",
          benefit: "Higher vitamin C than oranges",
          howToUse: "Add to salads, stir-fries, or eat raw as snacks",
        },
        {
          name: "Strawberries",
          benefit: "Rich in vitamin C and antioxidants",
          howToUse: "Eat fresh, add to smoothies, or mix with yogurt",
        },
        {
          name: "Kiwi",
          benefit: "More vitamin C than oranges",
          howToUse: "Eat 1-2 kiwis daily, add to fruit salads",
        },
      ],
      explanation: "These foods boost immune system and help with collagen production.",
    },
    anemia: {
      condition: "Iron Deficiency/Anemia",
      foods: [
        {
          name: "Spinach",
          benefit: "High in iron and folate",
          howToUse: "Add to smoothies, salads, or cook as side dish",
        },
        {
          name: "Lentils",
          benefit: "Plant-based iron and protein",
          howToUse: "Make lentil soup, dal, or add to salads",
        },
        {
          name: "Dark Chocolate",
          benefit: "Contains iron and antioxidants",
          howToUse: "Eat 1-2 squares of 70%+ dark chocolate daily",
        },
        {
          name: "Pumpkin Seeds",
          benefit: "Rich in iron and zinc",
          howToUse: "Snack on roasted seeds or add to salads",
        },
      ],
      explanation: "These iron-rich foods help increase red blood cell production.",
    },
    constipation: {
      condition: "Constipation",
      foods: [
        {
          name: "Prunes",
          benefit: "High fiber and natural laxative effect",
          howToUse: "Eat 3-4 prunes daily or drink prune juice",
        },
        {
          name: "Apples",
          benefit: "Pectin fiber aids digestion",
          howToUse: "Eat with skin on, 1-2 apples daily",
        },
        {
          name: "Flaxseeds",
          benefit: "Soluble and insoluble fiber",
          howToUse: "Add 1 tbsp ground flaxseed to smoothies or yogurt",
        },
        {
          name: "Sweet Potatoes",
          benefit: "High fiber and potassium",
          howToUse: "Bake or steam, eat with skin on",
        },
      ],
      explanation: "These high-fiber foods promote healthy bowel movements.",
    },
    "high blood pressure": {
      condition: "High Blood Pressure",
      foods: [
        {
          name: "Bananas",
          benefit: "High potassium helps regulate blood pressure",
          howToUse: "Eat 1-2 bananas daily as snacks or in smoothies",
        },
        {
          name: "Garlic",
          benefit: "Contains allicin which may lower blood pressure",
          howToUse: "Add fresh garlic to cooking, 1-2 cloves daily",
        },
        {
          name: "Beetroot",
          benefit: "Nitrates help dilate blood vessels",
          howToUse: "Drink beetroot juice or add to salads",
        },
        {
          name: "Oats",
          benefit: "Beta-glucan fiber helps lower blood pressure",
          howToUse: "Eat oatmeal for breakfast or add to smoothies",
        },
      ],
      explanation: "These foods contain compounds that support healthy blood pressure levels.",
    },
    inflammation: {
      condition: "Inflammation",
      foods: [
        {
          name: "Turmeric",
          benefit: "Curcumin has powerful anti-inflammatory properties",
          howToUse: "Add to curries, make turmeric tea, or take with black pepper",
        },
        {
          name: "Ginger",
          benefit: "Gingerol reduces inflammation",
          howToUse: "Make ginger tea, add to smoothies, or use in cooking",
        },
        {
          name: "Blueberries",
          benefit: "Anthocyanins fight inflammation",
          howToUse: "Eat fresh, add to yogurt, or blend in smoothies",
        },
        {
          name: "Salmon",
          benefit: "Omega-3 fatty acids reduce inflammation",
          howToUse: "Eat 2-3 servings per week, grilled or baked",
        },
      ],
      explanation: "These anti-inflammatory foods help reduce chronic inflammation in the body.",
    },
    "digestive issues": {
      condition: "Digestive Issues",
      foods: [
        {
          name: "Yogurt",
          benefit: "Probiotics support gut health",
          howToUse: "Eat plain yogurt with live cultures daily",
        },
        {
          name: "Ginger",
          benefit: "Soothes stomach and aids digestion",
          howToUse: "Make ginger tea or add fresh ginger to meals",
        },
        {
          name: "Papaya",
          benefit: "Papain enzyme aids protein digestion",
          howToUse: "Eat fresh papaya before or after meals",
        },
        {
          name: "Peppermint",
          benefit: "Soothes digestive tract",
          howToUse: "Drink peppermint tea after meals",
        },
      ],
      explanation: "These foods support healthy digestion and gut function.",
    },
  }

  static getFoodRecommendations(query: string): string | null {
    const lowerQuery = query.toLowerCase()

    // Check for specific health conditions
    for (const [condition, recommendation] of Object.entries(this.healthFoodMap)) {
      if (
        lowerQuery.includes(condition) ||
        lowerQuery.includes(recommendation.condition.toLowerCase()) ||
        this.matchesConditionKeywords(lowerQuery, condition)
      ) {
        return this.formatFoodRecommendation(recommendation)
      }
    }

    return null
  }

  private static matchesConditionKeywords(query: string, condition: string): boolean {
    const keywordMap: Record<string, string[]> = {
      dehydration: ["dehydrated", "thirsty", "dry mouth", "fluid loss"],
      "vitamin c deficiency": ["vitamin c", "immune system", "scurvy", "weak immunity"],
      anemia: ["iron deficiency", "tired", "fatigue", "pale", "weak"],
      constipation: ["constipated", "bowel movement", "digestive", "bloated"],
      "high blood pressure": ["hypertension", "blood pressure", "bp"],
      inflammation: ["inflamed", "swelling", "joint pain", "arthritis"],
      "digestive issues": ["stomach problems", "indigestion", "gut health", "bloating"],
    }

    const keywords = keywordMap[condition] || []
    return keywords.some((keyword) => query.includes(keyword))
  }

  private static formatFoodRecommendation(recommendation: HealthFoodRecommendation): string {
    let response = `🍎 **Food Recommendations for ${recommendation.condition}**\n\n`
    response += `${recommendation.explanation}\n\n`
    response += `**Recommended Foods:**\n\n`

    recommendation.foods.forEach((food, index) => {
      response += `**${index + 1}. ${food.name}**\n`
      response += `• **Benefit**: ${food.benefit}\n`
      response += `• **How to use**: ${food.howToUse}\n\n`
    })

    response += `⚠️ **Note**: These are general dietary suggestions. Consult a healthcare provider for persistent symptoms or serious conditions.`

    return response
  }

  static getAllConditions(): string[] {
    return Object.keys(this.healthFoodMap)
  }

  static getRandomFoodTip(): string {
    const conditions = Object.values(this.healthFoodMap)
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
    const randomFood = randomCondition.foods[Math.floor(Math.random() * randomCondition.foods.length)]

    return `💡 **Food Tip**: ${randomFood.name} is great for ${randomCondition.condition.toLowerCase()}! ${randomFood.benefit}. ${randomFood.howToUse}`
  }
}
