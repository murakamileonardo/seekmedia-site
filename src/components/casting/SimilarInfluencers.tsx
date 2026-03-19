"use client";

import { useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useInfluencerStore } from "@/hooks/useInfluencerStore";
import { BADGE_STYLES } from "@/lib/types";
import type { BadgeType, Influencer } from "@/lib/types";

interface SimilarInfluencersProps {
  currentSlug: string;
  currentNiches: string[];
}

const CARD_WIDTH = 200; // w-[200px]
const GAP = 20; // gap-5 = 20px

export function SimilarInfluencers({ currentSlug, currentNiches }: SimilarInfluencersProps) {
  const { influencers } = useInfluencerStore();
  const trackRef = useRef<HTMLDivElement>(null);
  const activeInfluencers = influencers.filter((inf) => inf.active !== false);

  // Filter by overlapping niches, exclude current
  let similar = activeInfluencers.filter(
    (inf) => inf.niches.some((n) => currentNiches.includes(n)) && inf.slug !== currentSlug
  );

  // Fallback: if fewer than 3 matches, show all except current
  if (similar.length < 3) {
    similar = activeInfluencers.filter((inf) => inf.slug !== currentSlug);
  }

  // Duplicate enough times to guarantee seamless loop
  const similarSlugs = similar.map((i) => i.slug).join(",");
  const items = useMemo(() => {
    if (similar.length === 0) return [] as (Influencer & { _key: string })[];
    const setWidth = similar.length * (CARD_WIDTH + GAP);
    const copies = Math.max(3, Math.ceil(3000 / setWidth) + 1);
    const result: (Influencer & { _key: string })[] = [];
    for (let c = 0; c < copies; c++) {
      for (const inf of similar) {
        result.push({ ...inf, _key: `${inf.slug}-${c}` });
      }
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [similarSlugs]);

  // Calculate one-set width for the translateX reset point
  const oneSetWidth = similar.length * (CARD_WIDTH + GAP);

  // Use requestAnimationFrame-based scroll for truly seamless loop
  const animRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (similar.length === 0) return;

    const speed = 0.5; // pixels per frame (~30px/s at 60fps)

    const tick = () => {
      if (!pausedRef.current && trackRef.current) {
        offsetRef.current += speed;
        if (offsetRef.current >= oneSetWidth) {
          offsetRef.current -= oneSetWidth;
        }
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [similar.length, oneSetWidth]);

  if (similar.length === 0) return null;

  return (
    <div
      className="overflow-hidden pt-2 -mt-2"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div
        ref={trackRef}
        className="flex gap-5 will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((inf) => (
          <Link
            key={inf._key}
            href={`/casting/${inf.slug}`}
            className="group shrink-0 w-[200px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-teal)]/50 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Photo */}
            <div className="aspect-square bg-[var(--color-surface-elevated)] relative overflow-hidden">
              {inf.photoUrl ? (
                <img src={inf.photoUrl} alt={inf.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${inf.color}15, transparent 60%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold" style={{ color: `${inf.color}30` }}>
                      {inf.name[0]}
                    </span>
                  </div>
                </>
              )}

              {/* Badges */}
              {inf.badges && inf.badges.length > 0 && (
                <div className="absolute top-2 right-2 flex flex-col items-end gap-0.5 z-10">
                  {inf.badges.slice(0, 1).map((badge) => {
                    const style = BADGE_STYLES[badge as BadgeType] || { bg: "rgba(0,240,208,0.25)", text: "#00F0D0" };
                    return (
                      <span
                        key={badge}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {badge}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <h4 className="font-semibold text-[var(--color-text)] text-xs truncate">{inf.name}</h4>
              <p className="text-[10px] text-[var(--color-text-muted)] mb-1.5">{inf.handle}</p>
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full border truncate"
                  style={{
                    borderColor: `${inf.color}40`,
                    color: inf.color,
                    backgroundColor: `${inf.color}10`,
                  }}
                >
                  {inf.niches[0]}
                </span>
                <span className="text-[10px] font-semibold text-[var(--color-accent-cyan)]">
                  {inf.followers}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
