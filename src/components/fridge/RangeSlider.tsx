
import { Scale } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface RangeSliderProps {
  icon?: React.ReactNode;
  label: string;
  minValue: number;
  maxValue: number;
  min?: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (values: number[]) => void;
}

const RangeSlider = ({
  icon,
  label,
  minValue,
  maxValue,
  min = 0,
  max,
  step,
  unit = '',
  onChange,
}: RangeSliderProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-olive flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm text-olive-light mb-2">
            <span>Minimum: {minValue}{unit}</span>
            <span>Maximum: {maxValue}{unit}</span>
          </div>
          <Slider
            defaultValue={[minValue, maxValue]}
            value={[minValue, maxValue]}
            onValueChange={onChange}
            min={min}
            max={max}
            step={step}
            className="w-full"
            thumbs={2}
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
