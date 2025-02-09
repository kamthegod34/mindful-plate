
import { Card } from "@/components/ui/card";
import { Scale, Timer, DollarSign } from "lucide-react";

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

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
}

const RecipeList = ({ recipes, onSelectRecipe }: RecipeListProps) => {
  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <Card
          key={recipe.id}
          className="p-4 hover:shadow-md transition-all cursor-pointer bg-white/50 backdrop-blur-sm"
          onClick={() => onSelectRecipe(recipe.id)}
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
  );
};

export default RecipeList;
