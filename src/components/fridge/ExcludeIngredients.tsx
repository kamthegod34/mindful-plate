
import { Input } from "@/components/ui/input";

interface ExcludeIngredientsProps {
  excludeIngredients: string[];
  onExcludeIngredient: (ingredient: string) => void;
  onRemoveExcluded: (ingredient: string) => void;
}

const ExcludeIngredients = ({
  excludeIngredients,
  onExcludeIngredient,
  onRemoveExcluded,
}: ExcludeIngredientsProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-olive">
        Exclude Ingredients
      </label>
      <div className="flex gap-2">
        <Input
          placeholder="Enter ingredient to exclude"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onExcludeIngredient((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {excludeIngredients.map((ingredient) => (
          <span
            key={ingredient}
            className="bg-olive/10 text-olive px-2 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {ingredient}
            <button
              onClick={() => onRemoveExcluded(ingredient)}
              className="hover:text-olive-dark"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExcludeIngredients;
