import { Metadata } from "next";
import { ALL_INFLUENCERS } from "@/lib/constants";
import { PerfilClient } from "@/components/casting/PerfilClient";

// Allow dynamic slugs not in generateStaticParams (admin-created influencers)
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const influencer = ALL_INFLUENCERS.find((i) => i.slug === slug);
  if (!influencer) {
    return {
      title: "Perfil — Casting SeekMedia",
      description: "Perfil de criador de conteúdo no casting da SeekMedia",
    };
  }
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

  return <PerfilClient slug={slug} />;
}
