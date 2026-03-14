"use client";

import { useEffect, useState, type RefObject } from "react";

export function useScrollProgress(containerRef: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollableDistance = containerHeight - viewportHeight;

        if (scrollableDistance <= 0) {
          setProgress(0);
          ticking = false;
          return;
        }

        const scrolled = -rect.top;
        const p = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
        setProgress(p);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return progress;
}
