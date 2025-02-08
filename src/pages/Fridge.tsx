
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { User, ChefHat, ShoppingCart, Heart, Timer, DollarSign, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

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

const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "High-Protein Chicken Bowl",
    image: "/placeholder.svg",
    protein: 45,
    calories: 550,
    time: 25,
    cost: 15,
    ingredients: ["Chicken breast", "Quinoa", "Broccoli", "Olive oil", "Seasonings"],
    instructions: ["Preheat oven to 400°F", "Season chicken", "Cook quinoa", "Roast broccoli"],
  },
  // Add more mock recipes as needed
];

const Fridge = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    minProtein: 30,
    maxCalories: 800,
    maxTime: 30,
    maxCost: 20,
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const handleSearch = () => {
    toast({
      title: "Searching recipes",
      description: "Finding recipes that match your preferences...",
    });
    // In a real implementation, this would call the AI/webscraping service
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowShoppingList(false);
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
            <Card className="p-6 space-y-6 bg-white/50 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-olive">Your Preferences</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-olive flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Minimum Protein (g)
                  </label>
                  <Slider
                    value={[preferences.minProtein]}
                    onValueChange={(value) => setPreferences({ ...preferences, minProtein: value[0] })}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <span className="text-sm text-olive-light">{preferences.minProtein}g</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-olive flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    Maximum Time (minutes)
                  </label>
                  <Slider
                    value={[preferences.maxTime]}
                    onValueChange={(value) => setPreferences({ ...preferences, maxTime: value[0] })}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                  <span className="text-sm text-olive-light">{preferences.maxTime} min</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-olive flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Maximum Cost ($)
                  </label>
                  <Slider
                    value={[preferences.maxCost]}
                    onValueChange={(value) => setPreferences({ ...preferences, maxCost: value[0] })}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                  <span className="text-sm text-olive-light">${preferences.maxCost}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-olive flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Maximum Calories
                  </label>
                  <Slider
                    value={[preferences.maxCalories]}
                    onValueChange={(value) => setPreferences({ ...preferences, maxCalories: value[0] })}
                    max={2000}
                    step={50}
                    className="w-full"
                  />
                  <span className="text-sm text-olive-light">{preferences.maxCalories} kcal</span>
                </div>
              </div>

              <Button
                onClick={handleSearch}
                className="w-full bg-olive hover:bg-olive-dark text-white transition-colors"
              >
                Find Recipes
              </Button>
            </Card>

            <div className="space-y-4">
              {mockRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="p-4 hover:shadow-md transition-all cursor-pointer bg-white/50 backdrop-blur-sm"
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  <div className="flex gap-4">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-olive">{recipe.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-olive-light">
                        <span className="flex items-center gap-1">
                          <Scale className="w-4 h-4" />
                          {recipe.protein}g protein
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer className="w-4 h-4" />
                          {recipe.time} min
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${recipe.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <Button
              onClick={() => setSelectedRecipe(null)}
              variant="ghost"
              className="text-olive hover:text-olive-dark"
            >
              ← Back to recipes
            </Button>

            <Card className="p-6 bg-white/50 backdrop-blur-sm">
              <div className="space-y-6">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-2xl font-semibold text-olive">{selectedRecipe.title}</h2>

                <div className="flex flex-wrap gap-4 text-sm text-olive-light">
                  <span className="flex items-center gap-1">
                    <Scale className="w-4 h-4" />
                    {selectedRecipe.protein}g protein
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    {selectedRecipe.time} min
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ${selectedRecipe.cost}
                  </span>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => setShowShoppingList(!showShoppingList)}
                    variant="outline"
                    className="w-full"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {showShoppingList ? "Hide" : "Show"} Shopping List
                  </Button>

                  {showShoppingList && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-olive">Shopping List</h3>
                      <ul className="list-disc list-inside space-y-1 text-olive-light">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="font-semibold text-olive">Instructions</h3>
                    <ol className="list-decimal list-inside space-y-2 text-olive-light">
                      {selectedRecipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Fridge;
