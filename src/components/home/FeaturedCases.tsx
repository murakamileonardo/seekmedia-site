import Link from "next/link";
import { FEATURED_CASES } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export function FeaturedCases() {
  return (
    <SectionWrapper id="cases">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Cases de <span className="text-gradient">Sucesso</span>
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
          Resultados reais de campanhas que fizeram a diferença
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {FEATURED_CASES.map((caseItem) => (
          <Link
            key={caseItem.brand}
            href={`/cases/${caseItem.slug}`}
            className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-teal)]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,192,176,0.1)]"
          >
            {/* Thumbnail placeholder */}
            <div className="aspect-video w-full bg-[var(--color-surface-elevated)] relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(0,240,208,0.08), rgba(128,240,144,0.04), transparent)`,
                }}
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-[var(--color-text)]">
                    {caseItem.brand[0]}
                  </span>
                </div>
                <span className="text-xs font-medium text-[var(--color-text-muted)]">
                  {caseItem.brand}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium text-[var(--color-text)] border border-white/30 rounded-full px-4 py-2">
                  Ver Case
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <span className="text-3xl font-extrabold text-gradient">
                  {caseItem.metric}
                </span>
                <span className="text-sm text-[var(--color-text-muted)] ml-2">
                  {caseItem.metricLabel}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mb-3 leading-relaxed">
                {caseItem.description}
              </p>
              <p className="text-xs text-[var(--color-accent-cyan)] font-medium">
                com {caseItem.influencer}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="secondary" href="/cases">
          Ver Todos os Cases
        </Button>
      </div>
    </SectionWrapper>
  );
}
