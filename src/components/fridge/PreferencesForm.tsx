
import { Scale, DollarSign, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RangeSlider from "./RangeSlider";
import ExcludeIngredients from "./ExcludeIngredients";

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
        <RangeSlider
          icon={<Scale className="w-4 h-4" />}
          label="Protein Range (g)"
          minValue={preferences.minProtein}
          maxValue={preferences.maxProtein}
          max={100}
          step={5}
          unit="g"
          onChange={(values) => onPreferencesChange({
            ...preferences,
            minProtein: values[0],
            maxProtein: values[1]
          })}
        />

        <RangeSlider
          icon={<Scale className="w-4 h-4" />}
          label="Calories Range"
          minValue={preferences.minCalories}
          maxValue={preferences.maxCalories}
          min={50}
          max={2000}
          step={50}
          unit=" kcal"
          onChange={(values) => onPreferencesChange({
            ...preferences,
            minCalories: values[0],
            maxCalories: values[1]
          })}
        />

        <RangeSlider
          icon={<Users className="w-4 h-4" />}
          label="Servings Range"
          minValue={preferences.minServings}
          maxValue={preferences.maxServings}
          min={1}
          max={8}
          step={1}
          onChange={(values) => onPreferencesChange({
            ...preferences,
            minServings: values[0],
            maxServings: values[1]
          })}
        />

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
              defaultValue={[preferences.maxReadyTime]}
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

        <ExcludeIngredients
          excludeIngredients={preferences.excludeIngredients}
          onExcludeIngredient={handleExcludeIngredient}
          onRemoveExcluded={handleRemoveExcluded}
        />
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
