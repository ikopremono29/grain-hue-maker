import { useEffect, useRef } from "react";

interface GradientPreviewProps {
  color1: { r: number; g: number; b: number };
  color2: { r: number; g: number; b: number };
  grainIntensity: number;
  gradientType: "two-tone" | "solid";
  gradientStyle: "linear" | "radial";
  gradientAngle: number;
}

export const GradientPreview = ({ color1, color2, grainIntensity, gradientType, gradientStyle, gradientAngle }: GradientPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create gradient or solid color
    if (gradientType === "solid") {
      ctx.fillStyle = `rgb(${color1.r}, ${color1.g}, ${color1.b})`;
      ctx.fillRect(0, 0, width, height);
    } else {
      let gradient;
      
      if (gradientStyle === "radial") {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.max(width, height) / 2;
        gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      } else {
        // Calculate linear gradient coordinates based on angle
        const angleRad = (gradientAngle * Math.PI) / 180;
        const x1 = width / 2 - (Math.cos(angleRad) * width) / 2;
        const y1 = height / 2 - (Math.sin(angleRad) * height) / 2;
        const x2 = width / 2 + (Math.cos(angleRad) * width) / 2;
        const y2 = height / 2 + (Math.sin(angleRad) * height) / 2;
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      }
      
      gradient.addColorStop(0, `rgb(${color1.r}, ${color1.g}, ${color1.b})`);
      gradient.addColorStop(1, `rgb(${color2.r}, ${color2.g}, ${color2.b})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

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
  }, [color1, color2, grainIntensity, gradientType, gradientStyle, gradientAngle]);

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
