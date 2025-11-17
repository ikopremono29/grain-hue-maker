import { useState } from "react";
import { GradientPreview } from "@/components/GradientPreview";
import { ColorSlider } from "@/components/ColorSlider";
import { DownloadControls } from "@/components/DownloadControls";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [color1, setColor1] = useState({ r: 147, g: 51, b: 234 });
  const [color2, setColor2] = useState({ r: 87, g: 0, b: 174 });
  const [grainIntensity, setGrainIntensity] = useState(30);
  const [gradientType, setGradientType] = useState<"two-tone" | "solid">("two-tone");
  const [gradientStyle, setGradientStyle] = useState<"linear" | "radial">("linear");
  const [gradientAngle, setGradientAngle] = useState(135);

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
              <GradientPreview 
                color1={color1} 
                color2={color2}
                grainIntensity={grainIntensity} 
                gradientType={gradientType}
                gradientStyle={gradientStyle}
                gradientAngle={gradientAngle}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div
                    className="w-10 h-10 rounded border border-border"
                    style={{ backgroundColor: `rgb(${color1.r}, ${color1.g}, ${color1.b})` }}
                  />
                  <span className="font-mono text-sm">
                    Color 1: RGB({color1.r}, {color1.g}, {color1.b})
                  </span>
                </div>
                {gradientType === "two-tone" && (
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div
                      className="w-10 h-10 rounded border border-border"
                      style={{ backgroundColor: `rgb(${color2.r}, ${color2.g}, ${color2.b})` }}
                    />
                    <span className="font-mono text-sm">
                      Color 2: RGB({color2.r}, {color2.g}, {color2.b})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Controls */}
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Color Controls</h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Color 1</Label>
                    <ColorSlider
                      label="Red"
                      value={color1.r}
                      onChange={(r) => setColor1({ ...color1, r })}
                      color="r"
                    />
                    <ColorSlider
                      label="Green"
                      value={color1.g}
                      onChange={(g) => setColor1({ ...color1, g })}
                      color="g"
                    />
                    <ColorSlider
                      label="Blue"
                      value={color1.b}
                      onChange={(b) => setColor1({ ...color1, b })}
                      color="b"
                    />
                  </div>

                  {gradientType === "two-tone" && (
                    <div className="space-y-4 pt-4 border-t border-border">
                      <Label className="text-sm font-medium">Color 2</Label>
                      <ColorSlider
                        label="Red"
                        value={color2.r}
                        onChange={(r) => setColor2({ ...color2, r })}
                        color="r"
                      />
                      <ColorSlider
                        label="Green"
                        value={color2.g}
                        onChange={(g) => setColor2({ ...color2, g })}
                        color="g"
                      />
                      <ColorSlider
                        label="Blue"
                        value={color2.b}
                        onChange={(b) => setColor2({ ...color2, b })}
                        color="b"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Gradient Type</Label>
                    <Select value={gradientType} onValueChange={(value) => setGradientType(value as "two-tone" | "solid")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="two-tone">Two-Tone Gradient</SelectItem>
                        <SelectItem value="solid">Solid Color</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {gradientType === "two-tone" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Gradient Style</Label>
                        <Select value={gradientStyle} onValueChange={(value) => setGradientStyle(value as "linear" | "radial")}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="radial">Radial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {gradientStyle === "linear" && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium">Gradient Angle</Label>
                            <span className="text-sm text-muted-foreground font-mono">{gradientAngle}°</span>
                          </div>
                          <Slider
                            value={[gradientAngle]}
                            onValueChange={([value]) => setGradientAngle(value)}
                            max={360}
                            step={1}
                          />
                        </div>
                      )}
                    </>
                  )}

                  <div className="space-y-2">
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
                </div>

                <DownloadControls 
                  color1={color1}
                  color2={color2}
                  grainIntensity={grainIntensity} 
                  gradientType={gradientType}
                  gradientStyle={gradientStyle}
                  gradientAngle={gradientAngle}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
