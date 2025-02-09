
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SearchForm from "@/components/fridge/SearchForm";
import PreferencesForm from "@/components/fridge/PreferencesForm";
import RecipeList from "@/components/fridge/RecipeList";
import RecipeDetails from "@/components/fridge/RecipeDetails";

interface Recipe {
  id: string;
  title: string;
  image: string;
  protein: number;
  calories: number;
  time: number;
  cost: number;
  ingredients: string[];
  instructions: string[];
}

const Fridge = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    minProtein: 10,
    maxProtein: 100,
    minCalories: 50,
    maxCalories: 800,
    minServings: 1,
    maxServings: 4,
    maxReadyTime: 60,
    diet: 'none',
    excludeIngredients: [] as string[],
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleAddIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients added",
        description: "Please add at least one ingredient to search for recipes.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Calling recipe-handler function with:', {
        ingredients,
        preferences,
      });

      const { data, error } = await supabase.functions.invoke('recipe-handler', {
        body: {
          type: 'byPreferences',
          params: {
            ingredients,
            minProtein: preferences.minProtein,
            maxProtein: preferences.maxProtein,
            minCalories: preferences.minCalories,
            maxCalories: preferences.maxCalories,
            minServings: preferences.minServings,
            maxServings: preferences.maxServings,
            maxReadyTime: preferences.maxReadyTime,
            diet: preferences.diet === 'none' ? '' : preferences.diet,
            excludeIngredients: preferences.excludeIngredients,
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
        cost: Math.round(recipe.pricePerServing / 100) || 0, // Convert cents to dollars
        ingredients: recipe.extendedIngredients?.map(i => i.original) || [],
        instructions: recipe.analyzedInstructions?.[0]?.steps?.map(s => s.step) || [],
      }));

      console.log('✅ Setting recipes state with:', transformedRecipes);
      setRecipes(transformedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast({
        title: "Error fetching recipes",
        description: "Please try again later or check the console for more details.",
        variant: "destructive",
      });
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeSelect = async (recipeId: string) => {
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
      };
      
      setSelectedRecipe(recipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      toast({
        title: "Error fetching recipe details",
        description: "Please try again later or check the console for more details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige pb-20">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center justify-between border-b border-olive/10">
        <h1 className="text-2xl font-bold text-olive italic">MindfulPlate</h1>
        <Link to="/profile" className="p-2 hover:bg-beige-light rounded-full transition-colors">
          <User className="w-6 h-6 text-olive" />
        </Link>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {!selectedRecipe ? (
          <>
            <SearchForm
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
            />

            <PreferencesForm
              preferences={preferences}
              onPreferencesChange={setPreferences}
              onSearch={handleSearch}
              loading={loading}
            />

            {recipes.length > 0 ? (
              <RecipeList
                recipes={recipes}
                onSelectRecipe={handleRecipeSelect}
              />
            ) : (
              <div className="text-center text-olive-light p-4">
                {loading ? 'Searching for recipes...' : 'No recipes found. Try adding ingredients and search!'}
              </div>
            )}
          </>
        ) : (
          <RecipeDetails
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
          />
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Fridge;
