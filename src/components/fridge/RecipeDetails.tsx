
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, Timer, DollarSign, ShoppingCart } from "lucide-react";

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

interface RecipeDetailsProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetails = ({ recipe, onBack }: RecipeDetailsProps) => {
  const [showShoppingList, setShowShoppingList] = useState(false);

  return (
    <div className="space-y-6">
      <Button
        onClick={onBack}
        variant="ghost"
        className="text-olive hover:text-olive-dark"
      >
        ← Back to recipes
      </Button>

      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="space-y-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-semibold text-olive">{recipe.title}</h2>

          <div className="flex flex-wrap gap-4 text-sm text-olive-light">
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
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-semibold text-olive">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-olive-light">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecipeDetails;
