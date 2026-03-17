"use client";

import { useEffect, useRef } from "react";
import type { QualitativeLevel } from "@/lib/simulador";
import { levelToPercent } from "@/lib/simulador";

export interface RadarAxis {
  label: string;
  level: QualitativeLevel;
}

interface RadarChartProps {
  axes: RadarAxis[];
}

export function RadarChart({ axes }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animatedRef = useRef<number[]>(axes.map(() => 0));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const n = axes.length;
    const targetValues = axes.map((a) => levelToPercent(a.level) / 100);

    // Ensure animatedRef matches axis count
    if (animatedRef.current.length !== n) {
      animatedRef.current = new Array(n).fill(0);
    }

    const startValues = [...animatedRef.current];
    const startTime = performance.now();
    const duration = 600;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function draw(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOut(progress);

      const current = startValues.map((s, i) => s + (targetValues[i] - s) * eased);
      animatedRef.current = current;

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const size = Math.min(canvas.parentElement!.clientWidth, 400);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.28;
      const angleStep = (Math.PI * 2) / n;
      const startAngle = -Math.PI / 2;

      ctx.clearRect(0, 0, size, size);

      // Grid rings (4 rings for 4 levels)
      for (let ring = 1; ring <= 4; ring++) {
        const r = (radius * ring) / 4;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
          const angle = startAngle + angleStep * (i % n);
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(46, 58, 58, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Axis lines
      for (let i = 0; i < n; i++) {
        const angle = startAngle + angleStep * i;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.strokeStyle = "rgba(46, 58, 58, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Data polygon
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const idx = i % n;
        const angle = startAngle + angleStep * idx;
        const r = radius * current[idx];
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Fill
      const gradient = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      gradient.addColorStop(0, "rgba(0, 240, 208, 0.2)");
      gradient.addColorStop(0.5, "rgba(128, 240, 144, 0.15)");
      gradient.addColorStop(1, "rgba(208, 240, 96, 0.2)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Stroke
      const strokeGrad = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      strokeGrad.addColorStop(0, "#00F0D0");
      strokeGrad.addColorStop(0.5, "#80F090");
      strokeGrad.addColorStop(1, "#D0F060");
      ctx.strokeStyle = strokeGrad;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Data points
      for (let i = 0; i < n; i++) {
        const angle = startAngle + angleStep * i;
        const r = radius * current[i];
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00F0D0";
        ctx.fill();
        ctx.strokeStyle = "#101818";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Labels + qualitative level
      for (let i = 0; i < n; i++) {
        const angle = startAngle + angleStep * i;
        const labelR = radius + 40;
        const x = cx + Math.cos(angle) * labelR;
        const y = cy + Math.sin(angle) * labelR;

        ctx.font = "11px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#8899A0";
        ctx.fillText(axes[i].label, x, y);

        // Qualitative level below
        ctx.font = "bold 10px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#00F0D0";
        ctx.fillText(axes[i].level, x, y + 14);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [axes]);

  return (
    <div className="flex items-center justify-center w-full">
      <canvas ref={canvasRef} className="max-w-[400px] w-full" />
    </div>
  );
}
