"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ALL_INFLUENCERS, CASTING_FILTERS } from "@/lib/constants";

export function CastingClient() {
  const [nicheFilter, setNicheFilter] = useState("Todos");
  const [platformFilter, setPlatformFilter] = useState("Todas");

  const filtered = useMemo(() => {
    return ALL_INFLUENCERS.filter((inf) => {
      if (nicheFilter !== "Todos" && inf.niche !== nicheFilter) return false;
      if (platformFilter !== "Todas" && !inf.platforms.includes(platformFilter)) return false;
      return true;
    });
  }, [nicheFilter, platformFilter]);

  return (
    <SectionWrapper>
      <div className="text-center mb-12 pt-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Nosso <span className="text-gradient">Casting</span>
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
          Mais de 500 criadores prontos para conectar sua marca ao público certo
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
            Nicho
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CASTING_FILTERS.niches.map((niche) => (
              <button
                key={niche}
                onClick={() => setNicheFilter(niche)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  nicheFilter === niche
                    ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                    : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                }`}
              >
                {niche}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
            Plataforma
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CASTING_FILTERS.platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setPlatformFilter(platform)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  platformFilter === platform
                    ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                    : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        {filtered.length} criador{filtered.length !== 1 ? "es" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((inf) => (
          <Link
            key={inf.slug}
            href={`/casting/${inf.slug}`}
            className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-teal)]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,192,176,0.08)]"
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
                <span className="text-5xl font-bold" style={{ color: `${inf.color}30` }}>
                  {inf.name[0]}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium text-[var(--color-text)] border border-white/30 rounded-full px-4 py-2">
                  Ver Perfil
                </span>
              </div>
            </div>
            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-[var(--color-text)] text-sm">{inf.name}</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-2">{inf.handle}</p>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: `${inf.color}40`,
                    color: inf.color,
                    backgroundColor: `${inf.color}10`,
                  }}
                >
                  {inf.niche}
                </span>
                <span className="text-xs font-semibold text-[var(--color-accent-cyan)]">
                  {inf.followers}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-muted)]">Nenhum criador encontrado com esses filtros.</p>
        </div>
      )}
    </SectionWrapper>
  );
}
