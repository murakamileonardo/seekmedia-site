// ═══ Simulador de Campanhas — Logic & Types ═══

// ── Brand Mode Types ──
export type InfluencerSize = "nano" | "micro" | "medio" | "macro" | "mega";
export type ContentType = "stories" | "feed" | "reels" | "video";
export type CampaignDuration = "1sem" | "1mes" | "3meses" | "6meses";
export type BrandSize = "startup" | "media" | "grande" | "multi";
export type NicheLevel = 1 | 2 | 3 | 4 | 5;
export type BudgetRange = "explorando" | "50k" | "50-200k" | "200k+";

export interface BrandInputs {
  description: string;
  influencerSize: InfluencerSize;
  quantity: number;
  platforms: { instagram: boolean; tiktok: boolean; youtube: boolean };
  contentType: ContentType;
  duration: CampaignDuration;
  exclusivity: boolean;
  brandSize: BrandSize;
  nicheLevel: NicheLevel;
  budgetRange: BudgetRange;
}

export interface RadarData {
  alcance: number;
  engajamento: number;
  durabilidade: number;
  custo: number;
  complexidade: number;
}

// ── Influencer Mode Types ──
export type FollowerRange = "10k" | "50k" | "100k" | "500k" | "1m" | "5m+";
export type EngagementRate = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type PostFrequency = "1x" | "2-3x" | "4-5x" | "diario";
export type NicheDefined = "sim" | "mais-ou-menos" | "nao";
export type BrandExperience = "nunca" | "algumas" | "frequente";

export interface InfluencerInputs {
  description: string;
  followers: FollowerRange;
  engagementRate: number;
  platforms: { instagram: boolean; tiktok: boolean; youtube: boolean; twitter: boolean };
  frequency: PostFrequency;
  nicheDefined: NicheDefined;
  brandExperience: BrandExperience;
}

export interface InfluencerOutput {
  score: number;
  monetizacao: number;
  versatilidade: number;
  atratividade: number;
}

// ── Brand Mode Calculations ──
const SIZE_WEIGHTS: Record<InfluencerSize, { alcance: number; engajamento: number; custo: number }> = {
  nano:  { alcance: 15, engajamento: 90, custo: 10 },
  micro: { alcance: 30, engajamento: 75, custo: 25 },
  medio: { alcance: 55, engajamento: 55, custo: 50 },
  macro: { alcance: 80, engajamento: 35, custo: 75 },
  mega:  { alcance: 95, engajamento: 20, custo: 95 },
};

const CONTENT_DURABILITY: Record<ContentType, number> = {
  stories: 15,
  feed: 45,
  reels: 65,
  video: 90,
};

const CONTENT_COST: Record<ContentType, number> = {
  stories: 15,
  feed: 35,
  reels: 50,
  video: 85,
};

const DURATION_WEIGHTS: Record<CampaignDuration, { durabilidade: number; complexidade: number }> = {
  "1sem":   { durabilidade: 20, complexidade: 10 },
  "1mes":   { durabilidade: 40, complexidade: 25 },
  "3meses": { durabilidade: 70, complexidade: 55 },
  "6meses": { durabilidade: 90, complexidade: 80 },
};

export function calculateRadar(inputs: BrandInputs): RadarData {
  const sizeW = SIZE_WEIGHTS[inputs.influencerSize];
  const platformCount = Object.values(inputs.platforms).filter(Boolean).length;
  const quantityNorm = Math.min(inputs.quantity / 10, 1);

  // Alcance: size + quantity + platforms
  const alcance = Math.min(100, sizeW.alcance * 0.5 + quantityNorm * 100 * 0.3 + platformCount * 15 * 0.2);

  // Engajamento: inversely related to size, boosted by niche
  const engajamento = Math.min(100, sizeW.engajamento * 0.6 + inputs.nicheLevel * 10 * 0.4);

  // Durabilidade: content type + duration
  const durW = DURATION_WEIGHTS[inputs.duration];
  const durabilidade = Math.min(100, CONTENT_DURABILITY[inputs.contentType] * 0.5 + durW.durabilidade * 0.5);

  // Custo: size + content type + exclusivity + quantity
  const exclusivityBonus = inputs.exclusivity ? 20 : 0;
  const custo = Math.min(100, sizeW.custo * 0.35 + CONTENT_COST[inputs.contentType] * 0.25 + exclusivityBonus * 0.2 + quantityNorm * 80 * 0.2);

  // Complexidade: quantity of small influencers + platforms + duration + niche
  const complexidade = Math.min(100,
    quantityNorm * 100 * 0.3 +
    platformCount * 20 * 0.2 +
    durW.complexidade * 0.25 +
    inputs.nicheLevel * 12 * 0.15 +
    (inputs.exclusivity ? 15 : 0) * 0.1
  );

  return {
    alcance: Math.round(alcance),
    engajamento: Math.round(engajamento),
    durabilidade: Math.round(durabilidade),
    custo: Math.round(custo),
    complexidade: Math.round(complexidade),
  };
}

export function getBrandConclusion(complexidade: number): { level: string; message: string } {
  if (complexidade <= 30) {
    return {
      level: "Baixa",
      message: "Campanha direta e focada. Boa opção para gestão interna com suporte pontual.",
    };
  } else if (complexidade <= 60) {
    return {
      level: "Média",
      message: "Campanha com múltiplas variáveis. Planejamento estratégico e curadoria fazem diferença no resultado.",
    };
  } else if (complexidade <= 85) {
    return {
      level: "Alta",
      message: "Operação complexa com múltiplos criadores e frentes. Experiência e processos consolidados são essenciais.",
    };
  } else {
    return {
      level: "Crítica",
      message: "Escala robusta que exige coordenação profissional. É exatamente onde uma agência especializada como a Seek entrega o maior valor.",
    };
  }
}

// ── Influencer Mode Calculations ──
const FOLLOWER_SCORES: Record<FollowerRange, number> = {
  "10k": 10,
  "50k": 25,
  "100k": 45,
  "500k": 65,
  "1m": 80,
  "5m+": 95,
};

const FREQUENCY_SCORES: Record<PostFrequency, number> = {
  "1x": 20,
  "2-3x": 45,
  "4-5x": 70,
  "diario": 90,
};

const NICHE_SCORES: Record<NicheDefined, number> = {
  sim: 90,
  "mais-ou-menos": 50,
  nao: 15,
};

const EXPERIENCE_SCORES: Record<BrandExperience, number> = {
  nunca: 10,
  algumas: 50,
  frequente: 90,
};

export function calculateInfluencerOutput(inputs: InfluencerInputs): InfluencerOutput {
  const followerScore = FOLLOWER_SCORES[inputs.followers];
  const engagementNorm = Math.min(inputs.engagementRate / 15, 1) * 100;
  const platformCount = Object.values(inputs.platforms).filter(Boolean).length;
  const frequencyScore = FREQUENCY_SCORES[inputs.frequency];
  const nicheScore = NICHE_SCORES[inputs.nicheDefined];
  const experienceScore = EXPERIENCE_SCORES[inputs.brandExperience];

  // Monetização: followers + engagement + experience
  const monetizacao = Math.round(
    followerScore * 0.4 + engagementNorm * 0.35 + experienceScore * 0.25
  );

  // Versatilidade: platforms + frequency + content types
  const versatilidade = Math.round(
    platformCount * 20 * 0.4 + frequencyScore * 0.35 + engagementNorm * 0.25
  );

  // Atratividade: niche + engagement + frequency + experience
  const atratividade = Math.round(
    nicheScore * 0.3 + engagementNorm * 0.25 + frequencyScore * 0.25 + experienceScore * 0.2
  );

  // Overall score
  const score = Math.round(monetizacao * 0.35 + versatilidade * 0.3 + atratividade * 0.35);

  return {
    score: Math.min(100, score),
    monetizacao: Math.min(100, monetizacao),
    versatilidade: Math.min(100, versatilidade),
    atratividade: Math.min(100, atratividade),
  };
}

export function getInfluencerMessage(score: number): { message: string; cta: string; ctaHref: string } {
  if (score >= 80) {
    return {
      message: "Perfil altamente atrativo. A Seek potencializa com campanhas exclusivas e negociação profissional.",
      cta: "Candidate-se ao Casting",
      ctaHref: "/contato?tipo=casting",
    };
  } else if (score >= 50) {
    return {
      message: "Base sólida. Com ajustes em frequência e diversificação, seu perfil pode alcançar outro patamar.",
      cta: "Fale com a Seek sobre como crescer",
      ctaHref: "/contato?tipo=consultoria",
    };
  } else if (score >= 20) {
    return {
      message: "Caminho certo! Nicho mais definido e consistência são os próximos passos.",
      cta: "Descubra como a Seek pode te ajudar",
      ctaHref: "/contato?tipo=crescimento",
    };
  } else {
    return {
      message: "Todo criador começou de algum lugar. Foque em consistência e encontre seu nicho.",
      cta: "Receba dicas para crescer",
      ctaHref: "/contato?tipo=dicas",
    };
  }
}

// ── Label Maps ──
export const INFLUENCER_SIZE_LABELS: Record<InfluencerSize, string> = {
  nano: "Nano",
  micro: "Micro",
  medio: "Médio",
  macro: "Macro",
  mega: "Mega",
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  stories: "Stories",
  feed: "Feed",
  reels: "Reels / Shorts",
  video: "Vídeo Dedicado",
};

export const DURATION_LABELS: Record<CampaignDuration, string> = {
  "1sem": "1 Semana",
  "1mes": "1 Mês",
  "3meses": "3 Meses",
  "6meses": "6 Meses",
};

export const BRAND_SIZE_LABELS: Record<BrandSize, string> = {
  startup: "Startup / PME",
  media: "Média",
  grande: "Grande",
  multi: "Multinacional",
};

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  explorando: "Explorando",
  "50k": "Até R$50K",
  "50-200k": "R$50K–200K",
  "200k+": "R$200K+",
};

export const FOLLOWER_LABELS: Record<FollowerRange, string> = {
  "10k": "10K",
  "50k": "50K",
  "100k": "100K",
  "500k": "500K",
  "1m": "1M",
  "5m+": "5M+",
};

export const FREQUENCY_LABELS: Record<PostFrequency, string> = {
  "1x": "1x/semana",
  "2-3x": "2-3x/semana",
  "4-5x": "4-5x/semana",
  diario: "Diário",
};
