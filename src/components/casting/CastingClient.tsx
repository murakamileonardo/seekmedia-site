"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CASTING_FILTERS } from "@/lib/constants";
import { useInfluencerStore } from "@/hooks/useInfluencerStore";
import { BADGE_STYLES } from "@/lib/types";
import type { BadgeType } from "@/lib/types";

export function CastingClient() {
  const { influencers } = useInfluencerStore();
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [nicheDropdownOpen, setNicheDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setNicheDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleNiche = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const removeNiche = (niche: string) => {
    setSelectedNiches((prev) => prev.filter((n) => n !== niche));
  };

  const nicheOptions = CASTING_FILTERS.niches.filter((n) => n !== "Todos");

  const filtered = useMemo(() => {
    return influencers
      .filter((inf) => {
        if (inf.active === false) return false;
        if (selectedNiches.length > 0 && !inf.niches.some((n) => selectedNiches.includes(n))) return false;
        if (debouncedQuery && !inf.name.toLowerCase().includes(debouncedQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => a.order - b.order);
  }, [influencers, selectedNiches, debouncedQuery]);

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

      {/* Filters row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Niche dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setNicheDropdownOpen(!nicheDropdownOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer border ${
              selectedNiches.length > 0
                ? "bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border-[var(--color-accent-cyan)]/40"
                : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
            }`}
          >
            <span>Nichos</span>
            {selectedNiches.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[var(--color-accent-cyan)] text-[#101818] text-[10px] font-bold flex items-center justify-center">
                {selectedNiches.length}
              </span>
            )}
            <svg className={`w-3 h-3 transition-transform duration-200 ${nicheDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {nicheDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-48 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl z-30 py-1.5 max-h-64 overflow-y-auto">
              {nicheOptions.map((niche) => (
                <button
                  key={niche}
                  onClick={() => toggleNiche(niche)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-[var(--color-surface-elevated)] transition-colors cursor-pointer"
                >
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    selectedNiches.includes(niche)
                      ? "bg-[var(--color-accent-cyan)] border-[var(--color-accent-cyan)]"
                      : "border-[var(--color-border)]"
                  }`}>
                    {selectedNiches.includes(niche) && (
                      <svg className="w-2.5 h-2.5 text-[#101818]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={selectedNiches.includes(niche) ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}>
                    {niche}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-56">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)]/30 transition-all duration-300"
          />
        </div>
      </div>

      {/* Active niche tags */}
      {selectedNiches.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {selectedNiches.map((niche) => (
            <span
              key={niche}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-accent-cyan)]/15 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/30"
            >
              {niche}
              <button
                onClick={() => removeNiche(niche)}
                className="hover:text-white transition-colors cursor-pointer ml-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          <button
            onClick={() => setSelectedNiches([])}
            className="px-2 py-1 rounded-full text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          >
            Limpar
          </button>
        </div>
      )}

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
                    <span className="text-5xl font-bold" style={{ color: `${inf.color}30` }}>
                      {inf.name[0]}
                    </span>
                  </div>
                </>
              )}

              {/* Badges */}
              {inf.badges && inf.badges.length > 0 && (
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
                  {inf.badges.map((badge) => {
                    const style = BADGE_STYLES[badge as BadgeType] || { bg: "rgba(0,240,208,0.25)", text: "#00F0D0" };
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
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1 flex-wrap min-w-0">
                  {inf.niches.map((niche) => (
                    <span
                      key={niche}
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor: `${inf.color}40`,
                        color: inf.color,
                        backgroundColor: `${inf.color}10`,
                      }}
                    >
                      {niche}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-[var(--color-accent-cyan)] shrink-0">
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
