import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ColorSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  color: "r" | "g" | "b";
}

export const ColorSlider = ({ label, value, onChange, color }: ColorSliderProps) => {
  const getColorClass = () => {
    switch (color) {
      case "r":
        return "data-[state=active]:bg-red-500";
      case "g":
        return "data-[state=active]:bg-green-500";
      case "b":
        return "data-[state=active]:bg-blue-500";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-sm text-muted-foreground font-mono">{value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        max={255}
        step={1}
        className={getColorClass()}
      />
    </div>
  );
};
