import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface DownloadControlsProps {
  color: { r: number; g: number; b: number };
  grainIntensity: number;
  gradientType: "two-tone" | "solid";
}

type Format = "png" | "jpg";
type Size = "512" | "1024" | "2048" | "4096";

export const DownloadControls = ({ color, grainIntensity, gradientType }: DownloadControlsProps) => {
  const [format, setFormat] = useState<Format>("png");
  const [size, setSize] = useState<Size>("1024");

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dimension = parseInt(size);
    canvas.width = dimension;
    canvas.height = dimension;

    // Create gradient or solid color
    if (gradientType === "solid") {
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.fillRect(0, 0, dimension, dimension);
    } else {
      const gradient = ctx.createLinearGradient(0, 0, dimension, dimension);
      gradient.addColorStop(0, `rgb(${color.r}, ${color.g}, ${color.b})`);
      gradient.addColorStop(1, `rgb(${Math.max(0, color.r - 60)}, ${Math.max(0, color.g - 60)}, ${Math.max(0, color.b - 60)})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimension, dimension);
    }

    // Add grain
    if (grainIntensity > 0) {
      const imageData = ctx.getImageData(0, 0, dimension, dimension);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * grainIntensity;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    // Download
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `gradient-${Date.now()}.${format}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Gradient downloaded successfully!");
      },
      format === "jpg" ? "image/jpeg" : "image/png",
      0.95
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Format</Label>
          <Select value={format} onValueChange={(value) => setFormat(value as Format)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Size</Label>
          <Select value={size} onValueChange={(value) => setSize(value as Size)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="512">512px</SelectItem>
              <SelectItem value="1024">1024px</SelectItem>
              <SelectItem value="2048">2048px</SelectItem>
              <SelectItem value="4096">4096px</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleDownload} className="w-full" size="lg">
        <Download className="mr-2 h-4 w-4" />
        Download Gradient
      </Button>
    </div>
  );
};
