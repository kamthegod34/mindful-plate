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
    minProtein: 30,
    maxCalories: 800,
    maxTime: 30,
    maxCost: 20,
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
          ingredients,
          preferences: {
            minProtein: preferences.minProtein,
            maxTime: preferences.maxTime,
            maxCost: preferences.maxCost,
            maxCalories: preferences.maxCalories,
          },
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Received response:', data);

      if (!data?.recipes || data.recipes.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try adjusting your preferences or adding different ingredients.",
        });
        setRecipes([]);
        return;
      }

      setRecipes(data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast({
        title: "Error fetching recipes",
        description: "Please try again later or check the console for more details.",
        variant: "destructive",
      });
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
          recipeId,
        },
      });

      if (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
      }

      console.log('Received recipe details:', data);
      
      if (!data?.recipe) {
        throw new Error('No recipe details received');
      }
      
      setSelectedRecipe(data.recipe);
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

            <RecipeList
              recipes={recipes}
              onSelectRecipe={handleRecipeSelect}
            />
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
