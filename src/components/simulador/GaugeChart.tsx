"use client";

import { useEffect, useRef } from "react";

interface GaugeChartProps {
  score: number;
}

export function GaugeChart({ score }: GaugeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animatedRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const target = score / 100;
    const start = animatedRef.current;
    const startTime = performance.now();
    const duration = 800;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function draw(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOut(progress);
      const current = start + (target - start) * eased;
      animatedRef.current = current;

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const width = Math.min(canvas.parentElement!.clientWidth, 320);
      const height = width * 0.65;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = width / 2;
      const cy = height * 0.8;
      const radius = width * 0.38;
      const lineWidth = 16;

      const startAngle = Math.PI;
      const endAngle = Math.PI * 2;

      ctx.clearRect(0, 0, width, height);

      // Background arc
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.strokeStyle = "rgba(46, 58, 58, 0.5)";
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.stroke();

      // Value arc
      const valueAngle = startAngle + (endAngle - startAngle) * current;
      if (current > 0) {
        const gradient = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
        gradient.addColorStop(0, "#00F0D0");
        gradient.addColorStop(0.5, "#80F090");
        gradient.addColorStop(1, "#D0F060");

        ctx.beginPath();
        ctx.arc(cx, cy, radius, startAngle, valueAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Needle
      const needleAngle = startAngle + (endAngle - startAngle) * current;
      const needleLen = radius - 10;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(needleAngle) * needleLen,
        cy + Math.sin(needleAngle) * needleLen
      );
      ctx.strokeStyle = "#F8F8F8";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#00F0D0";
      ctx.fill();

      // Score text
      const displayScore = Math.round(current * 100);
      ctx.font = "bold 36px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#F8F8F8";
      ctx.fillText(String(displayScore), cx, cy - 12);

      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#8899A0";
      ctx.fillText("Score de Atratividade", cx, cy - 48);

      // Min/max labels
      ctx.font = "10px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#8899A0";
      ctx.textAlign = "left";
      ctx.fillText("0", cx - radius - 5, cy + 16);
      ctx.textAlign = "right";
      ctx.fillText("100", cx + radius + 5, cy + 16);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [score]);

  return (
    <div className="flex items-center justify-center w-full">
      <canvas ref={canvasRef} className="max-w-[320px] w-full" />
    </div>
  );
}
