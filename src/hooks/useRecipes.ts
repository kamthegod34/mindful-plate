
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Recipe {
  id: string;
  title: string;
  image: string;
  protein: number;
  calories: number;
  time: number;
  cost: number;
  ingredients: string[];
  instructions: string[];
  sourceUrl?: string;
}

export interface RecipePreferences {
  minProtein: number;
  maxProtein: number;
  minCalories: number;
  maxCalories: number;
  minServings: number;
  maxServings: number;
  maxReadyTime: number;
  diet: string;
  excludeIngredients: string[];
}

export type SortOption = 'protein' | 'calories' | 'time' | 'cost';

export function useRecipes() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('time');

  const sortRecipes = (recipes: Recipe[], sortBy: SortOption) => {
    return [...recipes].sort((a, b) => {
      switch (sortBy) {
        case 'protein':
          return b.protein - a.protein;
        case 'calories':
          return a.calories - b.calories;
        case 'time':
          return a.time - b.time;
        case 'cost':
          return a.cost - b.cost;
        default:
          return 0;
      }
    });
  };

  const searchRecipes = async (ingredients: string[], preferences: RecipePreferences) => {
    // Validate ingredients
    if (!ingredients || ingredients.length === 0) {
      toast({
        title: "No ingredients added",
        description: "Please add at least one ingredient to search for recipes.",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty ingredients
    const validIngredients = ingredients.filter(i => i.trim().length > 0);
    if (validIngredients.length === 0) {
      toast({
        title: "Invalid ingredients",
        description: "Please add valid ingredients to search for recipes.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Calling recipe-handler function with:', {
        type: 'byPreferences',
        params: {
          ingredients: validIngredients,
          ...preferences,
        }
      });

      const { data, error } = await supabase.functions.invoke('recipe-handler', {
        body: {
          type: 'byPreferences',
          params: {
            ingredients: validIngredients,
            ...preferences,
          },
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Received response:', data);

      if (!data || !Array.isArray(data.results) || data.results.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try adjusting your preferences or adding different ingredients.",
          variant: "default",
        });
        setRecipes([]);
        return;
      }

      // Transform Spoonacular response into our Recipe format
      const transformedRecipes: Recipe[] = data.results.map(recipe => ({
        id: recipe.id.toString(),
        title: recipe.title,
        image: recipe.image,
        protein: Math.round(recipe.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || 0),
        calories: Math.round(recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0),
        time: recipe.readyInMinutes || 0,
        cost: Math.round(recipe.pricePerServing / 100) || 0,
        ingredients: recipe.extendedIngredients?.map(i => i.original) || [],
        instructions: recipe.analyzedInstructions?.[0]?.steps?.map(s => s.step) || [],
        sourceUrl: recipe.sourceUrl,
      }));

      const sortedRecipes = sortRecipes(transformedRecipes, sortBy);
      console.log('✅ Setting recipes state with:', sortedRecipes);
      setRecipes(sortedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast({
        title: "Error fetching recipes",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (recipeId: string) => {
    setLoading(true);
    try {
      console.log('Fetching recipe details for:', recipeId);
      
      const { data, error } = await supabase.functions.invoke('recipe-handler', {
        body: {
          type: 'details',
          params: {
            recipeId,
          },
        },
      });

      if (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
      }

      console.log('Received recipe details:', data);
      
      if (!data) {
        throw new Error('No recipe details received');
      }

      // Transform Spoonacular recipe details into our Recipe format
      const recipe: Recipe = {
        id: data.id.toString(),
        title: data.title,
        image: data.image,
        protein: Math.round(data.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || 0),
        calories: Math.round(data.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0),
        time: data.readyInMinutes || 0,
        cost: Math.round(data.pricePerServing / 100) || 0,
        ingredients: data.extendedIngredients?.map(i => i.original) || [],
        instructions: data.analyzedInstructions?.[0]?.steps?.map(s => s.step) || [],
        sourceUrl: data.sourceUrl,
      };
      
      setSelectedRecipe(recipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      toast({
        title: "Error fetching recipe details",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    recipes,
    loading,
    selectedRecipe,
    searchRecipes,
    fetchRecipeDetails,
    setSelectedRecipe,
    sortBy,
    setSortBy,
  };
}
