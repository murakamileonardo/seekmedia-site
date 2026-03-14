import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBar } from "@/components/ui/GradientBar";
import { Button } from "@/components/ui/Button";
import { ALL_CASES } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = ALL_CASES.find((c) => c.slug === slug);
  if (!caseItem) return { title: "Case não encontrado — SeekMedia" };
  return {
    title: `${caseItem.brand} — Case SeekMedia`,
    description: caseItem.description,
  };
}

export function generateStaticParams() {
  return ALL_CASES.map((c) => ({ slug: c.slug }));
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseItem = ALL_CASES.find((c) => c.slug === slug);
  if (!caseItem) notFound();

  return (
    <>
      <GradientBar />
      <SectionWrapper>
        <div className="max-w-4xl mx-auto pt-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
                <span className="text-sm font-bold text-[var(--color-text)]">{caseItem.brand[0]}</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{caseItem.brand}</h1>
                <p className="text-sm text-[var(--color-accent-cyan)]">com {caseItem.influencer}</p>
              </div>
            </div>
          </div>

          {/* Hero metric */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 mb-8 text-center">
            <p className="text-5xl sm:text-6xl font-extrabold text-gradient mb-2">{caseItem.metric}</p>
            <p className="text-[var(--color-text-muted)]">{caseItem.metricLabel}</p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Sobre a campanha</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">{caseItem.longDescription}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Plataformas</p>
              <p className="text-sm font-medium text-[var(--color-text)]">{caseItem.platforms.join(", ")}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Duração</p>
              <p className="text-sm font-medium text-[var(--color-text)]">{caseItem.duration}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Influenciador</p>
              <p className="text-sm font-medium text-[var(--color-text)]">{caseItem.influencer}</p>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Resultados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {caseItem.results.map((result) => (
                <div
                  key={result.label}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center"
                >
                  <p className="text-2xl font-extrabold text-gradient mb-1">{result.value}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{result.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Quer resultados como esses?</h3>
            <p className="text-[var(--color-text-muted)] mb-6">
              Entre em contato e descubra como criar uma campanha de sucesso para sua marca.
            </p>
            <Button variant="primary" href="/contato">
              Fale com a Seek
            </Button>
          </div>
        </div>
      </SectionWrapper>
      <GradientBar />
    </>
  );
}
