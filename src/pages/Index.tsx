import { useState } from "react";
import { GradientPreview } from "@/components/GradientPreview";
import { ColorSlider } from "@/components/ColorSlider";
import { DownloadControls } from "@/components/DownloadControls";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [color, setColor] = useState({ r: 147, g: 51, b: 234 });
  const [grainIntensity, setGrainIntensity] = useState(30);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Grainy Gradient Generator</h1>
          <p className="text-muted-foreground">Create beautiful grainy gradients with custom colors</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <Card className="p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Preview</h2>
              <GradientPreview color={color} grainIntensity={grainIntensity} />
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div
                  className="w-10 h-10 rounded border border-border"
                  style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                />
                <span className="font-mono text-sm">
                  RGB({color.r}, {color.g}, {color.b})
                </span>
              </div>
            </div>
          </Card>

          {/* Controls */}
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Color Controls</h2>
                <div className="space-y-4">
                  <ColorSlider
                    label="Red"
                    value={color.r}
                    onChange={(r) => setColor({ ...color, r })}
                    color="r"
                  />
                  <ColorSlider
                    label="Green"
                    value={color.g}
                    onChange={(g) => setColor({ ...color, g })}
                    color="g"
                  />
                  <ColorSlider
                    label="Blue"
                    value={color.b}
                    onChange={(b) => setColor({ ...color, b })}
                    color="b"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Grain Intensity</Label>
                    <span className="text-sm text-muted-foreground font-mono">{grainIntensity}</span>
                  </div>
                  <Slider
                    value={[grainIntensity]}
                    onValueChange={([value]) => setGrainIntensity(value)}
                    max={100}
                    step={1}
                  />
                </div>

                <DownloadControls color={color} grainIntensity={grainIntensity} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
