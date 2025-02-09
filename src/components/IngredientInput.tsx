
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

const IngredientInput = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
}: IngredientInputProps) => {
  const [newIngredient, setNewIngredient] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      onAddIngredient(newIngredient.trim());
      setNewIngredient("");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="Add an ingredient (e.g., eggs)"
          className="flex-1"
        />
        <Button type="submit" variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient) => (
          <Badge
            key={ingredient}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {ingredient}
            <button
              onClick={() => onRemoveIngredient(ingredient)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;
