"use client";

import { useEffect, useRef } from "react";
import type { RadarData } from "@/lib/simulador";

interface RadarChartProps {
  data: RadarData;
}

const LABELS = ["Alcance", "Engajamento", "Durabilidade", "Custo", "Complexidade"];
const KEYS: (keyof RadarData)[] = ["alcance", "engajamento", "durabilidade", "custo", "complexidade"];

export function RadarChart({ data }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animatedRef = useRef<number[]>([0, 0, 0, 0, 0]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetValues = KEYS.map((k) => data[k] / 100);
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
      const radius = size * 0.35;
      const angleStep = (Math.PI * 2) / 5;
      const startAngle = -Math.PI / 2;

      ctx.clearRect(0, 0, size, size);

      // Grid rings
      for (let ring = 1; ring <= 4; ring++) {
        const r = (radius * ring) / 4;
        ctx.beginPath();
        for (let i = 0; i <= 5; i++) {
          const angle = startAngle + angleStep * (i % 5);
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
      for (let i = 0; i < 5; i++) {
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
      for (let i = 0; i <= 5; i++) {
        const idx = i % 5;
        const angle = startAngle + angleStep * idx;
        const r = radius * current[idx];
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Fill with gradient
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
      for (let i = 0; i < 5; i++) {
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

      // Labels
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < 5; i++) {
        const angle = startAngle + angleStep * i;
        const labelR = radius + 28;
        const x = cx + Math.cos(angle) * labelR;
        const y = cy + Math.sin(angle) * labelR;
        ctx.fillStyle = "#8899A0";
        ctx.fillText(LABELS[i], x, y);

        // Value
        const val = Math.round(current[i] * 100);
        ctx.font = "bold 11px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#00F0D0";
        ctx.fillText(String(val), x, y + 15);
        ctx.font = "12px Inter, system-ui, sans-serif";
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [data]);

  return (
    <div className="flex items-center justify-center w-full">
      <canvas ref={canvasRef} className="max-w-[400px] w-full" />
    </div>
  );
}
