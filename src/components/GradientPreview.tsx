import { useEffect, useRef } from "react";

interface GradientPreviewProps {
  color: { r: number; g: number; b: number };
  grainIntensity: number;
}

export const GradientPreview = ({ color, grainIntensity }: GradientPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `rgb(${color.r}, ${color.g}, ${color.b})`);
    gradient.addColorStop(1, `rgb(${Math.max(0, color.r - 60)}, ${Math.max(0, color.g - 60)}, ${Math.max(0, color.b - 60)})`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add grain
    if (grainIntensity > 0) {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * grainIntensity;
        data[i] += noise;     // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
      }

      ctx.putImageData(imageData, 0, 0);
    }
  }, [color, grainIntensity]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full border border-border rounded-lg"
      />
    </div>
  );
};
