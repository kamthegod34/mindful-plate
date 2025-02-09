
import { Scale, Timer, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Preferences {
  minProtein: number;
  maxCalories: number;
  maxTime: number;
  maxCost: number;
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
            <Timer className="w-4 h-4" />
            Maximum Time (minutes)
          </label>
          <Slider
            value={[preferences.maxTime]}
            onValueChange={(value) => onPreferencesChange({ ...preferences, maxTime: value[0] })}
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
            onValueChange={(value) => onPreferencesChange({ ...preferences, maxCost: value[0] })}
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
            onValueChange={(value) => onPreferencesChange({ ...preferences, maxCalories: value[0] })}
            max={2000}
            step={50}
            className="w-full"
          />
          <span className="text-sm text-olive-light">{preferences.maxCalories} kcal</span>
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
