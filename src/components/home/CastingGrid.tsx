import Link from "next/link";
import { FEATURED_INFLUENCERS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { BADGE_STYLES } from "@/lib/types";
import type { BadgeType } from "@/lib/types";

export function CastingGrid() {
  return (
    <SectionWrapper id="casting">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Nosso <span className="text-gradient">Casting</span>
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
          Conheça alguns dos criadores que fazem parte do nosso portfólio exclusivo
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {FEATURED_INFLUENCERS.map((influencer) => (
          <Link
            key={influencer.handle}
            href={`/casting/${influencer.slug}`}
            className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-teal)]/50 hover:shadow-[0_0_40px_rgba(16,192,176,0.1)] transition-all duration-500 hover:-translate-y-1"
          >
            {/* Photo placeholder */}
            <div
              className="aspect-[3/4] w-full relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${influencer.color}15, var(--color-surface-elevated))`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full opacity-30"
                  style={{
                    background: `linear-gradient(135deg, ${influencer.color}, var(--color-teal))`,
                  }}
                />
              </div>

              {/* Badges */}
              {influencer.badges && influencer.badges.length > 0 && (
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
                  {influencer.badges.map((badge) => {
                    const style = BADGE_STYLES[badge as BadgeType] || { bg: "rgba(239,68,68,0.25)", text: "#EF4444" };
                    return (
                      <span
                        key={badge}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm"
                        style={{
                          backgroundColor: style.bg,
                          color: style.text,
                          border: `1px solid ${style.text}40`,
                        }}
                      >
                        {badge}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-sm font-semibold text-[var(--color-accent-cyan)]">
                  Ver Perfil
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-sm text-[var(--color-text)] truncate">
                {influencer.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-2">
                {influencer.handle}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]">
                  {influencer.niche}
                </span>
                <span className="text-xs font-semibold text-[var(--color-accent-cyan)]">
                  {influencer.followers}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="secondary" href="/casting">
          Ver Casting Completo
        </Button>
      </div>
    </SectionWrapper>
  );
}
