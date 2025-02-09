
import { Card } from "@/components/ui/card";
import IngredientInput from "@/components/IngredientInput";

interface SearchFormProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

const SearchForm = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
}: SearchFormProps) => {
  return (
    <Card className="p-6 space-y-6 bg-white/50 backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-olive">Your Ingredients</h2>
      <IngredientInput
        ingredients={ingredients}
        onAddIngredient={onAddIngredient}
        onRemoveIngredient={onRemoveIngredient}
      />
    </Card>
  );
};

export default SearchForm;
