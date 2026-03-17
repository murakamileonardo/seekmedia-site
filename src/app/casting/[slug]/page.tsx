import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBar } from "@/components/ui/GradientBar";
import { Button } from "@/components/ui/Button";
import { ALL_INFLUENCERS } from "@/lib/constants";
import { SimilarInfluencers } from "@/components/casting/SimilarInfluencers";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const influencer = ALL_INFLUENCERS.find((i) => i.slug === slug);
  if (!influencer) return { title: "Influenciador não encontrado — SeekMedia" };
  return {
    title: `${influencer.name} — Casting SeekMedia`,
    description: influencer.bio,
  };
}

export function generateStaticParams() {
  return ALL_INFLUENCERS.map((i) => ({ slug: i.slug }));
}

export default async function PerfilPage({ params }: Props) {
  const { slug } = await params;
  const influencer = ALL_INFLUENCERS.find((i) => i.slug === slug);
  if (!influencer) notFound();

  return (
    <>
      <GradientBar />
      <SectionWrapper>
        <div className="max-w-4xl mx-auto pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Photo */}
            <div className="md:col-span-1">
              <div
                className="aspect-square rounded-2xl bg-[var(--color-surface-elevated)] relative overflow-hidden border border-[var(--color-border)]"
                style={{
                  boxShadow: `0 0 60px ${influencer.color}20`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${influencer.color}20, transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl font-bold" style={{ color: `${influencer.color}40` }}>
                    {influencer.name[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{
                    borderColor: `${influencer.color}40`,
                    color: influencer.color,
                    backgroundColor: `${influencer.color}10`,
                  }}
                >
                  {influencer.niche}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-1">{influencer.name}</h1>
              <p className="text-[var(--color-text-muted)] mb-6">{influencer.handle}</p>
              <p className="text-[var(--color-text)] leading-relaxed mb-8">{influencer.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center">
                  <p className="text-2xl font-extrabold text-gradient">{influencer.followers}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Seguidores</p>
                </div>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center">
                  <p className="text-2xl font-extrabold text-gradient">{influencer.engagement}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Engajamento</p>
                </div>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center">
                  <p className="text-2xl font-extrabold text-gradient">{influencer.platforms.length}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Plataformas</p>
                </div>
              </div>

              {/* Platforms */}
              <div className="flex flex-wrap gap-2 mb-8">
                {influencer.platforms.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <Button variant="primary" href={`/contato?tipo=campanha&influenciador=${influencer.slug}`}>
                Quero esse criador na minha campanha
              </Button>
            </div>
          </div>
        </div>
        {/* Similar Influencers */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">
            Criadores <span className="text-gradient">Similares</span>
          </h2>
          <div className="pt-1">
            <SimilarInfluencers currentSlug={influencer.slug} currentNiche={influencer.niche} />
          </div>
        </div>
      </SectionWrapper>

      <GradientBar />
    </>
  );
}
