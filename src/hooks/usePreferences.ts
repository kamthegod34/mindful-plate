
import { useState } from "react";
import { RecipePreferences } from "./useRecipes";

export function usePreferences() {
  const [preferences, setPreferences] = useState<RecipePreferences>({
    minProtein: 10,
    maxProtein: 100,
    minCalories: 50,
    maxCalories: 800,
    minServings: 1,
    maxServings: 4,
    maxReadyTime: 60,
    diet: 'none',
    excludeIngredients: [],
  });

  return {
    preferences,
    setPreferences,
  };
}
