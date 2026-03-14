"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTERS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

function CounterCard({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Number((eased * value).toFixed(decimals)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient mb-2">
        {decimals > 0 ? displayValue.toFixed(decimals) : displayValue}
        {suffix}
      </div>
      <p className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export function SocialProof() {
  return (
    <SectionWrapper className="py-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {COUNTERS.map((counter) => (
          <CounterCard
            key={counter.label}
            value={counter.value}
            suffix={counter.suffix}
            label={counter.label}
            decimals={counter.decimals}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
