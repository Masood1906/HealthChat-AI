export interface FoodItem {
  name: string
  calories: number
  serving: string
  category: "fruit" | "vegetable" | "fast-food" | "grain" | "protein" | "dairy" | "snack" | "beverage"
  nutrients?: {
    protein?: number
    carbs?: number
    fat?: number
    fiber?: number
  }
}

export const FOOD_DATABASE: FoodItem[] = [
  // Fruits
  { name: "apple", calories: 95, serving: "1 medium (182g)", category: "fruit", nutrients: { carbs: 25, fiber: 4 } },
  { name: "banana", calories: 105, serving: "1 medium (118g)", category: "fruit", nutrients: { carbs: 27, fiber: 3 } },
  { name: "orange", calories: 62, serving: "1 medium (154g)", category: "fruit", nutrients: { carbs: 15, fiber: 3 } },
  { name: "strawberry", calories: 49, serving: "1 cup (152g)", category: "fruit", nutrients: { carbs: 12, fiber: 3 } },
  { name: "grapes", calories: 104, serving: "1 cup (151g)", category: "fruit", nutrients: { carbs: 27, fiber: 1 } },
  { name: "watermelon", calories: 46, serving: "1 cup (152g)", category: "fruit", nutrients: { carbs: 12, fiber: 1 } },
  { name: "pineapple", calories: 82, serving: "1 cup (165g)", category: "fruit", nutrients: { carbs: 22, fiber: 2 } },
  { name: "mango", calories: 107, serving: "1 cup (165g)", category: "fruit", nutrients: { carbs: 28, fiber: 3 } },
  { name: "blueberry", calories: 84, serving: "1 cup (148g)", category: "fruit", nutrients: { carbs: 21, fiber: 4 } },
  { name: "avocado", calories: 234, serving: "1 medium (150g)", category: "fruit", nutrients: { fat: 21, fiber: 10 } },

  // Vegetables
  {
    name: "broccoli",
    calories: 55,
    serving: "1 cup (156g)",
    category: "vegetable",
    nutrients: { protein: 4, carbs: 11, fiber: 5 },
  },
  { name: "carrot", calories: 52, serving: "1 cup (128g)", category: "vegetable", nutrients: { carbs: 12, fiber: 4 } },
  {
    name: "spinach",
    calories: 7,
    serving: "1 cup (30g)",
    category: "vegetable",
    nutrients: { protein: 1, carbs: 1, fiber: 1 },
  },
  {
    name: "tomato",
    calories: 32,
    serving: "1 medium (123g)",
    category: "vegetable",
    nutrients: { carbs: 7, fiber: 2 },
  },
  { name: "cucumber", calories: 16, serving: "1 cup (119g)", category: "vegetable", nutrients: { carbs: 4, fiber: 1 } },
  {
    name: "bell pepper",
    calories: 46,
    serving: "1 cup (149g)",
    category: "vegetable",
    nutrients: { carbs: 11, fiber: 3 },
  },
  { name: "onion", calories: 64, serving: "1 cup (160g)", category: "vegetable", nutrients: { carbs: 15, fiber: 3 } },
  {
    name: "potato",
    calories: 161,
    serving: "1 medium (173g)",
    category: "vegetable",
    nutrients: { carbs: 37, fiber: 4 },
  },
  {
    name: "sweet potato",
    calories: 112,
    serving: "1 medium (128g)",
    category: "vegetable",
    nutrients: { carbs: 26, fiber: 4 },
  },
  { name: "lettuce", calories: 10, serving: "1 cup (72g)", category: "vegetable", nutrients: { carbs: 2, fiber: 1 } },

  // Fast Food
  {
    name: "big mac",
    calories: 563,
    serving: "1 burger",
    category: "fast-food",
    nutrients: { protein: 25, carbs: 45, fat: 33 },
  },
  {
    name: "french fries",
    calories: 365,
    serving: "medium (115g)",
    category: "fast-food",
    nutrients: { carbs: 48, fat: 17 },
  },
  {
    name: "pizza slice",
    calories: 285,
    serving: "1 slice",
    category: "fast-food",
    nutrients: { protein: 12, carbs: 36, fat: 10 },
  },
  {
    name: "chicken nuggets",
    calories: 270,
    serving: "6 pieces",
    category: "fast-food",
    nutrients: { protein: 15, carbs: 16, fat: 16 },
  },
  {
    name: "whopper",
    calories: 657,
    serving: "1 burger",
    category: "fast-food",
    nutrients: { protein: 28, carbs: 49, fat: 40 },
  },
  {
    name: "taco",
    calories: 170,
    serving: "1 taco",
    category: "fast-food",
    nutrients: { protein: 8, carbs: 13, fat: 10 },
  },
  {
    name: "hot dog",
    calories: 151,
    serving: "1 hot dog",
    category: "fast-food",
    nutrients: { protein: 5, carbs: 2, fat: 13 },
  },
  {
    name: "subway sandwich",
    calories: 350,
    serving: "6 inch",
    category: "fast-food",
    nutrients: { protein: 24, carbs: 47, fat: 6 },
  },

  // Grains
  {
    name: "white rice",
    calories: 205,
    serving: "1 cup cooked",
    category: "grain",
    nutrients: { carbs: 45, protein: 4 },
  },
  {
    name: "brown rice",
    calories: 216,
    serving: "1 cup cooked",
    category: "grain",
    nutrients: { carbs: 45, protein: 5, fiber: 4 },
  },
  { name: "bread", calories: 79, serving: "1 slice", category: "grain", nutrients: { carbs: 14, protein: 4 } },
  { name: "pasta", calories: 220, serving: "1 cup cooked", category: "grain", nutrients: { carbs: 44, protein: 8 } },
  {
    name: "oatmeal",
    calories: 154,
    serving: "1 cup cooked",
    category: "grain",
    nutrients: { carbs: 28, protein: 6, fiber: 4 },
  },

  // Protein
  { name: "chicken breast", calories: 231, serving: "100g", category: "protein", nutrients: { protein: 31, fat: 3 } },
  { name: "salmon", calories: 208, serving: "100g", category: "protein", nutrients: { protein: 20, fat: 13 } },
  { name: "egg", calories: 155, serving: "2 large eggs", category: "protein", nutrients: { protein: 13, fat: 10 } },
  { name: "ground beef", calories: 250, serving: "100g", category: "protein", nutrients: { protein: 26, fat: 15 } },

  // Dairy
  { name: "milk", calories: 149, serving: "1 cup", category: "dairy", nutrients: { protein: 8, carbs: 12, fat: 8 } },
  { name: "yogurt", calories: 154, serving: "1 cup", category: "dairy", nutrients: { protein: 13, carbs: 17, fat: 4 } },
  { name: "cheese", calories: 113, serving: "1 oz", category: "dairy", nutrients: { protein: 7, fat: 9 } },

  // Snacks
  { name: "chips", calories: 152, serving: "1 oz (28g)", category: "snack", nutrients: { carbs: 15, fat: 10 } },
  { name: "cookies", calories: 142, serving: "2 cookies", category: "snack", nutrients: { carbs: 20, fat: 7 } },
  { name: "chocolate", calories: 235, serving: "1.5 oz bar", category: "snack", nutrients: { carbs: 26, fat: 13 } },

  // Beverages
  { name: "coca cola", calories: 140, serving: "12 fl oz", category: "beverage", nutrients: { carbs: 39 } },
  { name: "orange juice", calories: 112, serving: "1 cup", category: "beverage", nutrients: { carbs: 26 } },
  { name: "coffee", calories: 2, serving: "1 cup", category: "beverage", nutrients: {} },
  { name: "beer", calories: 153, serving: "12 fl oz", category: "beverage", nutrients: { carbs: 13 } },
]

export class FoodCalorieService {
  static searchFood(query: string): FoodItem[] {
    const searchTerm = query.toLowerCase().trim()

    // Direct match
    const directMatch = FOOD_DATABASE.filter((food) => food.name.toLowerCase() === searchTerm)

    if (directMatch.length > 0) {
      return directMatch
    }

    // Partial match
    const partialMatch = FOOD_DATABASE.filter(
      (food) => food.name.toLowerCase().includes(searchTerm) || searchTerm.includes(food.name.toLowerCase()),
    )

    return partialMatch
  }

  static getCalorieInfo(foodName: string): string {
    const results = this.searchFood(foodName)

    if (results.length === 0) {
      return `I don't have calorie information for "${foodName}" in my database. Try searching for common foods like apple, banana, chicken, rice, etc.`
    }

    if (results.length === 1) {
      const food = results[0]
      let response = `🍎 **${food.name.charAt(0).toUpperCase() + food.name.slice(1)}**\n`
      response += `📊 **Calories:** ${food.calories} per ${food.serving}\n`
      response += `🏷️ **Category:** ${food.category}\n`

      if (food.nutrients) {
        response += `\n**Nutritional Info:**\n`
        if (food.nutrients.protein) response += `• Protein: ${food.nutrients.protein}g\n`
        if (food.nutrients.carbs) response += `• Carbs: ${food.nutrients.carbs}g\n`
        if (food.nutrients.fat) response += `• Fat: ${food.nutrients.fat}g\n`
        if (food.nutrients.fiber) response += `• Fiber: ${food.nutrients.fiber}g\n`
      }

      return response
    }

    // Multiple matches
    let response = `I found multiple foods matching "${foodName}":\n\n`
    results.slice(0, 5).forEach((food) => {
      response += `• **${food.name}**: ${food.calories} calories per ${food.serving}\n`
    })

    return response
  }

  static getRandomHealthyFood(): FoodItem {
    const healthyFoods = FOOD_DATABASE.filter((food) => food.category === "fruit" || food.category === "vegetable")
    return healthyFoods[Math.floor(Math.random() * healthyFoods.length)]
  }
}
