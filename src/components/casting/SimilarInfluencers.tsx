"use client";

import Link from "next/link";
import { ALL_INFLUENCERS } from "@/lib/constants";
import { BADGE_STYLES } from "@/lib/types";
import type { BadgeType } from "@/lib/types";

interface SimilarInfluencersProps {
  currentSlug: string;
  currentNiche: string;
}

export function SimilarInfluencers({ currentSlug, currentNiche }: SimilarInfluencersProps) {
  // Filter by same niche, exclude current
  let similar = ALL_INFLUENCERS.filter(
    (inf) => inf.niche === currentNiche && inf.slug !== currentSlug
  );

  // Fallback: if fewer than 3 matches, show all except current
  if (similar.length < 3) {
    similar = ALL_INFLUENCERS.filter((inf) => inf.slug !== currentSlug);
  }

  if (similar.length === 0) return null;

  // Duplicate for seamless infinite scroll
  const items = [...similar, ...similar];

  return (
    <div className="overflow-hidden pt-2 -mt-2">
      <div
        className="flex gap-5 w-max pause-on-hover"
        style={{
          animation: `scroll-left ${similar.length * 5}s linear infinite`,
        }}
      >
        {items.map((inf, i) => (
          <Link
            key={`${inf.slug}-${i}`}
            href={`/casting/${inf.slug}`}
            className="group shrink-0 w-[200px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-teal)]/50 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Photo placeholder */}
            <div className="aspect-square bg-[var(--color-surface-elevated)] relative overflow-hidden">
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

              {/* Badges */}
              {inf.badges && inf.badges.length > 0 && (
                <div className="absolute top-2 right-2 flex flex-col gap-0.5 z-10">
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
                  className="text-[10px] px-1.5 py-0.5 rounded-full border"
                  style={{
                    borderColor: `${inf.color}40`,
                    color: inf.color,
                    backgroundColor: `${inf.color}10`,
                  }}
                >
                  {inf.niche}
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
