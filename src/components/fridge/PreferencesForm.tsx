
import { Scale, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Preferences {
  minProtein: number;
  maxCalories: number;
  diet: string;
  excludeIngredients: string[];
}

interface PreferencesFormProps {
  preferences: Preferences;
  onPreferencesChange: (preferences: Preferences) => void;
  onSearch: () => void;
  loading: boolean;
}

const PreferencesForm = ({
  preferences,
  onPreferencesChange,
  onSearch,
  loading,
}: PreferencesFormProps) => {
  const handleExcludeIngredient = (ingredient: string) => {
    if (ingredient && !preferences.excludeIngredients.includes(ingredient)) {
      onPreferencesChange({
        ...preferences,
        excludeIngredients: [...preferences.excludeIngredients, ingredient]
      });
    }
  };

  const handleRemoveExcluded = (ingredient: string) => {
    onPreferencesChange({
      ...preferences,
      excludeIngredients: preferences.excludeIngredients.filter(i => i !== ingredient)
    });
  };

  return (
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
            onValueChange={(value) => onPreferencesChange({ ...preferences, minProtein: value[0] })}
            max={100}
            step={5}
            className="w-full"
          />
          <span className="text-sm text-olive-light">{preferences.minProtein}g</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-olive flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Maximum Calories
          </label>
          <Slider
            value={[preferences.maxCalories]}
            onValueChange={(value) => onPreferencesChange({ ...preferences, maxCalories: value[0] })}
            max={2000}
            step={50}
            className="w-full"
          />
          <span className="text-sm text-olive-light">{preferences.maxCalories} kcal</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-olive">
            Dietary Preferences
          </label>
          <Select
            value={preferences.diet}
            onValueChange={(value) => onPreferencesChange({ ...preferences, diet: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
              <SelectItem value="gluten-free">Gluten Free</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-olive">
            Exclude Ingredients
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter ingredient to exclude"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleExcludeIngredient((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {preferences.excludeIngredients.map((ingredient) => (
              <span
                key={ingredient}
                className="bg-olive/10 text-olive px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {ingredient}
                <button
                  onClick={() => handleRemoveExcluded(ingredient)}
                  className="hover:text-olive-dark"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={onSearch}
        className="w-full bg-olive hover:bg-olive-dark text-white transition-colors"
        disabled={loading}
      >
        <Search className="w-4 h-4 mr-2" />
        {loading ? "Searching..." : "Find Recipes"}
      </Button>
    </Card>
  );
};

export default PreferencesForm;
