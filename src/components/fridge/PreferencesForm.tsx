
import { Scale, DollarSign, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Preferences {
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
            Protein Range (g)
          </label>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm text-olive-light mb-2">
                <span>Minimum: {preferences.minProtein}g</span>
                <span>Maximum: {preferences.maxProtein}g</span>
              </div>
              <Slider
                value={[preferences.minProtein, preferences.maxProtein]}
                onValueChange={(value) => onPreferencesChange({ 
                  ...preferences, 
                  minProtein: value[0],
                  maxProtein: value[1]
                })}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-olive flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Calories Range
          </label>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm text-olive-light mb-2">
                <span>Minimum: {preferences.minCalories} kcal</span>
                <span>Maximum: {preferences.maxCalories} kcal</span>
              </div>
              <Slider
                value={[preferences.minCalories, preferences.maxCalories]}
                onValueChange={(value) => onPreferencesChange({ 
                  ...preferences, 
                  minCalories: value[0],
                  maxCalories: value[1]
                })}
                min={50}
                max={2000}
                step={50}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-olive flex items-center gap-2">
            <Users className="w-4 h-4" />
            Servings Range
          </label>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm text-olive-light mb-2">
                <span>Minimum: {preferences.minServings}</span>
                <span>Maximum: {preferences.maxServings}</span>
              </div>
              <Slider
                value={[preferences.minServings, preferences.maxServings]}
                onValueChange={(value) => onPreferencesChange({ 
                  ...preferences, 
                  minServings: value[0],
                  maxServings: value[1]
                })}
                min={1}
                max={8}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-olive flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Maximum Preparation Time
          </label>
          <div>
            <div className="flex justify-between text-sm text-olive-light mb-2">
              <span>{preferences.maxReadyTime} minutes</span>
            </div>
            <Slider
              value={[preferences.maxReadyTime]}
              onValueChange={(value) => onPreferencesChange({ 
                ...preferences, 
                maxReadyTime: value[0]
              })}
              min={10}
              max={120}
              step={5}
              className="w-full"
            />
          </div>
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
              <SelectItem value="none">No Restrictions</SelectItem>
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
