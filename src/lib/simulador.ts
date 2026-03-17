// ═══ Simulador de Campanhas V2 — Spec V1 Final 17/03/2026 ═══

// ── Qualitative Levels ──
export type QualitativeLevel = "Baixo" | "Médio" | "Alto" | "Muito Alto";

export function scoreToLevel(score: number): QualitativeLevel {
  if (score <= 25) return "Baixo";
  if (score <= 50) return "Médio";
  if (score <= 75) return "Alto";
  return "Muito Alto";
}

export function levelToPercent(level: QualitativeLevel): number {
  switch (level) {
    case "Baixo": return 25;
    case "Médio": return 50;
    case "Alto": return 75;
    case "Muito Alto": return 100;
  }
}

// ── Brand Mode Types ──
export type BudgetRange = "ate20k" | "20k-50k" | "50k-150k" | "150k+";
export type Prazo = "urgente" | "normal" | "planejado";
export type Abrangencia = "nada-nichado" | "pouco-nichado" | "nichado" | "muito-nichado";

export interface PlatformFlags {
  instagram: boolean;
  kick: boolean;
  kwai: boolean;
  tiktok: boolean;
  tiktokLive: boolean;
  twitch: boolean;
  twitter: boolean;
  youtube: boolean;
  youtubeLive: boolean;
}

export const LIVE_PLATFORM_KEYS: (keyof PlatformFlags)[] = ["kick", "tiktokLive", "twitch", "youtubeLive"];

export interface BrandInputs {
  objetivo: number; // 0=100% Branding, 100=100% Performance
  orcamento: BudgetRange;
  prazo: Prazo;
  criadores: number; // 1-10+
  plataformas: PlatformFlags;
  abrangencia: Abrangencia;
}

export interface BrandRadarData {
  alcancePotencial: QualitativeLevel;
  engajamentoEsperado: QualitativeLevel;
  complexidadeGestao: QualitativeLevel;
  velocidadeResultado: QualitativeLevel;
  riscoExecucao: QualitativeLevel;
}

export interface BrandBars {
  volumeEntregaveis: QualitativeLevel;
  dificuldadeCriadores: QualitativeLevel;
  intensidadeNegociacao: QualitativeLevel;
  necessidadeAcompanhamento: QualitativeLevel;
}

export interface BrandConclusion {
  id: string;
  titulo: string;
  texto: string;
}

// ── Influencer Mode Types ──
export type FollowerRange = "<10k" | "10-50k" | "50-200k" | "200-500k" | "500k+";
export type EngagementRange = "0-5" | "5-10" | "10-15" | "15+";
export type NichoLevel = "nada-nichado" | "pouco-nichado" | "nichado" | "muito-nichado";
export type ExperienciaMarcas = "nunca" | "poucas" | "frequente";
export type LiveMetricMode = "espectadores" | "horas-assistidas";
export type ViewerRange = "<50" | "50-200" | "200-1000" | "1000-5000" | "5000+";
export type WatchHoursRange = "<500h" | "500-5000h" | "5000-20000h" | "20000-100000h" | "100000h+";
export type LiveHoursRange = "<10h" | "10-20h" | "20-40h" | "40-80h" | "80h+";

export interface InfluencerInputs {
  seguidores: FollowerRange;
  engajamento: EngagementRange;
  plataformas: PlatformFlags;
  nicho: NichoLevel;
  experiencia: ExperienciaMarcas;
  fazLives: boolean;
  liveMetricMode: LiveMetricMode;
  espectadores: ViewerRange;
  horasAssistidas: WatchHoursRange;
  horasLiveMensais: LiveHoursRange;
}

export interface InfluencerRadarData {
  monetizacao: QualitativeLevel;
  versatilidade: QualitativeLevel;
  atratividade: QualitativeLevel;
}

export interface InfluencerBars {
  demandaMercado: QualitativeLevel;
  competitividadeNicho: QualitativeLevel;
  potencialCrescimento: QualitativeLevel;
  preparoCampanhas: QualitativeLevel;
}

export interface InfluencerConclusion {
  id: string;
  titulo: string;
  texto: string;
}

export interface LiveConclusion {
  id: string;
  titulo: string;
  texto: string;
}

// ── Label Maps ──
export const BUDGET_LABELS: Record<BudgetRange, string> = {
  "ate20k": "Até R$ 20K",
  "20k-50k": "R$ 20K a R$ 50K",
  "50k-150k": "R$ 50K a R$ 150K",
  "150k+": "R$ 150K+",
};

export const BUDGET_DESCRIPTIONS: Record<BudgetRange, string> = {
  "ate20k": "campanha teste ou pontual",
  "20k-50k": "campanha focada",
  "50k-150k": "campanha robusta",
  "150k+": "operação de grande escala",
};

export const PRAZO_LABELS: Record<Prazo, string> = {
  urgente: "Urgente",
  normal: "Normal",
  planejado: "Planejado",
};

export const PRAZO_DESCRIPTIONS: Record<Prazo, string> = {
  urgente: "2 a 3 semanas",
  normal: "1 a 2 meses",
  planejado: "3+ meses",
};

export const ABRANGENCIA_LABELS: Record<Abrangencia, string> = {
  "nada-nichado": "Nada Nichado",
  "pouco-nichado": "Pouco Nichado",
  "nichado": "Nichado",
  "muito-nichado": "Muito Nichado",
};

export const ABRANGENCIA_DESCRIPTIONS: Record<Abrangencia, string> = {
  "nada-nichado": "produto de massa, todo mundo usa",
  "pouco-nichado": "público amplo mas com alguma segmentação",
  "nichado": "público específico e definido",
  "muito-nichado": "micro-segmento, público ultra-específico",
};

export const FOLLOWER_LABELS: Record<FollowerRange, string> = {
  "<10k": "< 10K",
  "10-50k": "10-50K",
  "50-200k": "50-200K",
  "200-500k": "200-500K",
  "500k+": "500K+",
};

export const ENGAGEMENT_LABELS: Record<EngagementRange, string> = {
  "0-5": "0-5%",
  "5-10": "5-10%",
  "10-15": "10-15%",
  "15+": "+15%",
};

export const ENGAGEMENT_DESCRIPTIONS: Record<EngagementRange, string> = {
  "0-5": "abaixo da média",
  "5-10": "saudável",
  "10-15": "acima da média",
  "15+": "excepcional",
};

export const NICHO_LABELS: Record<NichoLevel, string> = {
  "nada-nichado": "Nada Nichado",
  "pouco-nichado": "Pouco Nichado",
  "nichado": "Nichado",
  "muito-nichado": "Muito Nichado",
};

export const EXPERIENCIA_LABELS: Record<ExperienciaMarcas, string> = {
  nunca: "Nunca",
  poucas: "Poucas vezes",
  frequente: "Frequente",
};

export const VIEWER_LABELS: Record<ViewerRange, string> = {
  "<50": "< 50",
  "50-200": "50-200",
  "200-1000": "200-1.000",
  "1000-5000": "1.000-5.000",
  "5000+": "5.000+",
};

export const WATCH_HOURS_LABELS: Record<WatchHoursRange, string> = {
  "<500h": "< 500h",
  "500-5000h": "500-5.000h",
  "5000-20000h": "5.000-20.000h",
  "20000-100000h": "20.000-100.000h",
  "100000h+": "100.000h+",
};

export const LIVE_HOURS_LABELS: Record<LiveHoursRange, string> = {
  "<10h": "< 10h",
  "10-20h": "10-20h",
  "20-40h": "20-40h",
  "40-80h": "40-80h",
  "80h+": "80h+",
};

// ── Brand Mode Scoring Weights ──

const BUDGET_SCORES: Record<BudgetRange, number> = {
  "ate20k": 15, "20k-50k": 40, "50k-150k": 70, "150k+": 95,
};

const PRAZO_SCORES: Record<Prazo, number> = {
  urgente: 90, normal: 50, planejado: 15,
};

const ABRANGENCIA_SCORES: Record<Abrangencia, number> = {
  "nada-nichado": 15, "pouco-nichado": 40, "nichado": 70, "muito-nichado": 95,
};

export function calculateBrandRadar(inputs: BrandInputs): BrandRadarData {
  const platformCount = Object.values(inputs.plataformas).filter(Boolean).length;
  const criadoresNorm = Math.min(inputs.criadores / 10, 1) * 100;
  const budgetScore = BUDGET_SCORES[inputs.orcamento];
  const prazoScore = PRAZO_SCORES[inputs.prazo]; // high = urgent
  const abrangenciaScore = ABRANGENCIA_SCORES[inputs.abrangencia]; // high = nichado
  const abrangenciaInversa = 100 - abrangenciaScore;

  // Alcance Potencial: criadores 40% + orçamento 30% + plataformas 20% + abrangência inversa 10%
  const alcance = criadoresNorm * 0.4 + budgetScore * 0.3 + (platformCount * 33) * 0.2 + abrangenciaInversa * 0.1;

  // Engajamento Esperado: abrangência 35% + menos criadores 25% + branding 20% + prazo longo 20%
  const menosCriadores = 100 - criadoresNorm;
  const brandingPercent = 100 - inputs.objetivo; // 0=branding, 100=performance → invert
  const prazoLongo = 100 - prazoScore;
  const engajamento = abrangenciaScore * 0.35 + menosCriadores * 0.25 + brandingPercent * 0.2 + prazoLongo * 0.2;

  // Complexidade de Gestão: criadores 35% + plataformas 25% + prazo inverso 20% + abrangência 20%
  const complexidade = criadoresNorm * 0.35 + (platformCount * 33) * 0.25 + prazoScore * 0.2 + abrangenciaScore * 0.2;

  // Velocidade de Resultado: performance 40% + prazo curto 30% + orçamento alto 20% + criadores 10%
  const performancePercent = inputs.objetivo;
  const velocidade = performancePercent * 0.4 + prazoScore * 0.3 + budgetScore * 0.2 + criadoresNorm * 0.1;

  // Risco de Execução: prazo inverso 30% + criadores 25% + plataformas 20% + abrangência 15% + orçamento inverso 10%
  const orcamentoInverso = 100 - budgetScore;
  const risco = prazoScore * 0.3 + criadoresNorm * 0.25 + (platformCount * 33) * 0.2 + abrangenciaScore * 0.15 + orcamentoInverso * 0.1;

  return {
    alcancePotencial: scoreToLevel(Math.min(100, alcance)),
    engajamentoEsperado: scoreToLevel(Math.min(100, engajamento)),
    complexidadeGestao: scoreToLevel(Math.min(100, complexidade)),
    velocidadeResultado: scoreToLevel(Math.min(100, velocidade)),
    riscoExecucao: scoreToLevel(Math.min(100, risco)),
  };
}

export function calculateBrandBars(inputs: BrandInputs): BrandBars {
  const platformCount = Object.values(inputs.plataformas).filter(Boolean).length;
  const criadoresNorm = Math.min(inputs.criadores / 10, 1) * 100;
  const budgetScore = BUDGET_SCORES[inputs.orcamento];
  const prazoScore = PRAZO_SCORES[inputs.prazo];
  const abrangenciaScore = ABRANGENCIA_SCORES[inputs.abrangencia];

  // Volume de entregáveis: criadores + plataformas
  const volume = criadoresNorm * 0.5 + (platformCount * 33) * 0.5;

  // Dificuldade de encontrar criadores: abrangência + orçamento inverso
  const dificuldade = abrangenciaScore * 0.6 + (100 - budgetScore) * 0.4;

  // Intensidade de negociação: criadores + abrangência + orçamento inverso
  const negociacao = criadoresNorm * 0.35 + abrangenciaScore * 0.35 + (100 - budgetScore) * 0.3;

  // Necessidade de acompanhamento: criadores + plataformas + prazo curto
  const acompanhamento = criadoresNorm * 0.35 + (platformCount * 33) * 0.3 + prazoScore * 0.35;

  return {
    volumeEntregaveis: scoreToLevel(Math.min(100, volume)),
    dificuldadeCriadores: scoreToLevel(Math.min(100, dificuldade)),
    intensidadeNegociacao: scoreToLevel(Math.min(100, negociacao)),
    necessidadeAcompanhamento: scoreToLevel(Math.min(100, acompanhamento)),
  };
}

// ── Brand Conclusions (M1-M22) ──

interface ConclusionRule {
  id: string;
  match: (i: BrandInputs) => boolean;
  titulo: string;
  texto: string;
}

const BRAND_CONCLUSIONS: ConclusionRule[] = [
  {
    id: "M1",
    match: (i) => i.orcamento === "ate20k" && i.criadores <= 2 && (i.prazo === "normal" || i.prazo === "planejado") && i.abrangencia === "nada-nichado",
    titulo: "Campanha Teste",
    texto: "Uma boa forma de começar. Com um ou dois criadores e produto de massa, a execução é direta e o risco é baixo. O ponto crítico é a escolha — com poucas fichas na mesa, cada criador precisa ser certeiro. É o tipo de seleção em que experiência de mercado evita erros que custam a campanha inteira.",
  },
  {
    id: "M2",
    match: (i) => i.orcamento === "ate20k" && i.criadores <= 2 && (i.abrangencia === "nichado" || i.abrangencia === "muito-nichado"),
    titulo: "Nicho com Orçamento Enxuto",
    texto: "Produto de nicho com orçamento limitado exige precisão cirúrgica na escolha do criador. O lado bom: criadores nichados têm audiência fiel e engajada. O desafio: eles são poucos e sabem do seu valor. Quem já tem relacionamento com esses criadores consegue condições que um primeiro contato raramente alcança.",
  },
  {
    id: "M3",
    match: (i) => i.orcamento === "ate20k" && i.criadores >= 3 && i.criadores <= 5,
    titulo: "Muitos Criadores, Pouco Orçamento",
    texto: "Dividir esse orçamento entre vários criadores coloca o cachê individual em uma faixa onde os criadores tendem a priorizar outros trabalhos. Não é impossível — mas o esforço de negociação e gestão é desproporcional. Talvez concentrar em 1-2 criadores certos gere mais resultado.",
  },
  {
    id: "M4",
    match: (i) => i.orcamento === "ate20k" && i.criadores > 5,
    titulo: "Operação Inviável",
    texto: "Esse orçamento distribuído entre tantos criadores resulta em cachês que dificilmente atraem criadores comprometidos. A recomendação é reduzir a quantidade e investir em menos criadores com mais qualidade — ou aumentar o orçamento se o volume for essencial.",
  },
  {
    id: "M5",
    match: (i) => i.orcamento === "ate20k" && i.prazo === "urgente",
    titulo: "Pressa com Recurso Limitado",
    texto: "Orçamento apertado e prazo curto é a combinação que mais gera frustração. Criadores disponíveis de última hora geralmente não são a primeira escolha, e o conteúdo apressado raramente entrega o melhor resultado.",
  },
  {
    id: "M6",
    match: (i) => i.orcamento === "20k-50k" && i.criadores <= 2 && i.objetivo > 70,
    titulo: "Performance Concentrada",
    texto: "Investimento sólido focado em conversão com poucos criadores. Funciona bem quando os criadores certos têm audiência compradora. O risco: performance depende de tracking preciso, otimização em tempo real e ajustes rápidos. Sem acompanhamento dedicado, muito do investimento vira alcance sem conversão.",
  },
  {
    id: "M7",
    match: (i) => i.orcamento === "20k-50k" && i.criadores >= 3 && i.criadores <= 5 && (i.abrangencia === "nichado" || i.abrangencia === "muito-nichado"),
    titulo: "Sweet Spot Nichado",
    texto: "Configuração inteligente para produtos de nicho. Orçamento suficiente para criadores relevantes, volume gerenciável. O desafio que pouca gente antecipa: encontrar 3-5 criadores que realmente dominem esse nicho específico. É onde curadoria especializada transforma o resultado.",
  },
  {
    id: "M8",
    match: (i) => i.orcamento === "20k-50k" && i.criadores >= 3 && i.criadores <= 5 && i.abrangencia === "nada-nichado" && (100 - i.objetivo) > 70,
    titulo: "Branding Acessível",
    texto: "Campanha de awareness com produto de massa e orçamento moderado. Vários criadores amplificam a presença em diferentes audiências. O desafio invisível: manter a consistência da mensagem entre criadores diferentes sem parecer roteirizado.",
  },
  {
    id: "M9",
    match: (i) => {
      const pc = Object.values(i.plataformas).filter(Boolean).length;
      return i.orcamento === "20k-50k" && i.criadores > 5 && pc >= 2;
    },
    titulo: "Gestão Intensa",
    texto: "Com 5+ criadores em múltiplas plataformas, você coordena 15-25+ entregáveis: briefings por plataforma, formatos diferentes, prazos de aprovação. Viável, mas exige alguém dedicado exclusivamente a essa operação.",
  },
  {
    id: "M10",
    match: (i) => i.orcamento === "20k-50k" && i.prazo === "urgente" && i.criadores > 5,
    titulo: "Corrida com Obstáculos",
    texto: "Muitos criadores, pouco tempo e orçamento moderado. O resultado típico é entregar 70% do potencial. Com planejamento antecipado ou gestão profissional, esse número sobe consideravelmente.",
  },
  {
    id: "M11",
    match: (i) => i.orcamento === "50k-150k" && i.criadores <= 2 && i.objetivo > 70,
    titulo: "Aposta Grande em Poucos",
    texto: "Investimento significativo concentrado em poucos criadores focados em resultado. Quando dá certo, o ROI é espetacular. Quando não, o prejuízo é proporcional. Fundamental acompanhar em tempo real — esperar o relatório final para descobrir que não funcionou é caro demais nessa faixa.",
  },
  {
    id: "M12",
    match: (i) => i.orcamento === "50k-150k" && i.criadores >= 3 && i.criadores <= 5 && i.abrangencia === "nichado",
    titulo: "Campanha Premium Nichada",
    texto: "Configuração que gera campanhas memoráveis. Orçamento suficiente para criadores de peso em um nicho definido. A complexidade está na orquestração — timing, consistência, complementaridade. Parece fácil de fora e é cirúrgica por dentro.",
  },
  {
    id: "M13",
    match: (i) => {
      const pc = Object.values(i.plataformas).filter(Boolean).length;
      return i.orcamento === "50k-150k" && i.criadores > 5 && pc >= 3;
    },
    titulo: "Operação Robusta",
    texto: "Campanha de escala real: 30-50+ entregáveis entre criadores e plataformas, negociações individuais, contratos, briefings customizados e monitoramento em tempo real. Campanhas desse porte sem operação profissional quase sempre estouram prazo, orçamento ou ambos.",
  },
  {
    id: "M14",
    match: (i) => i.orcamento === "50k-150k" && (100 - i.objetivo) > 70 && i.abrangencia === "muito-nichado",
    titulo: "Branding de Nicho Premium",
    texto: "Branding em nicho ultra-específico com orçamento robusto. O pool de criadores relevantes é pequeno, e cada um sabe que é insubstituível. A negociação precisa de sutileza — é o cenário onde relacionamentos pré-existentes com criadores determinam o resultado.",
  },
  {
    id: "M15",
    match: (i) => i.orcamento === "50k-150k" && i.prazo === "urgente" && (i.abrangencia === "nichado" || i.abrangencia === "muito-nichado"),
    titulo: "Agulha no Palheiro Express",
    texto: "Orçamento bom, mas produto nichado com prazo apertado. O pool de criadores qualificados é pequeno e os disponíveis no curto prazo são ainda menos. Quem já tem mapeamento desse nicho resolve em dias o que levaria semanas do zero.",
  },
  {
    id: "M16",
    match: (i) => i.orcamento === "150k+" && i.criadores <= 2,
    titulo: "Aposta Concentrada",
    texto: "Investimento alto concentrado em poucos nomes — provavelmente celebridades ou mega-influenciadores. A gestão é simples, mas o risco é concentrado. E a negociação nessa faixa é um jogo à parte — assessorias, empresários, contratos longos.",
  },
  {
    id: "M17",
    match: (i) => {
      const pc = Object.values(i.plataformas).filter(Boolean).length;
      return i.orcamento === "150k+" && i.criadores >= 5 && i.criadores <= 8 && pc >= 2;
    },
    titulo: "Campanha de Alto Impacto",
    texto: "Território de campanhas que movem métricas de marca. O diferencial entre uma campanha boa e excepcional nessa faixa é a curadoria — não só quem tem audiência, mas quem vai genuinamente engajar com o produto.",
  },
  {
    id: "M18",
    match: (i) => {
      const pc = Object.values(i.plataformas).filter(Boolean).length;
      return i.orcamento === "150k+" && i.criadores > 8 && pc >= 3;
    },
    titulo: "Operação de Guerra",
    texto: "Operação de grande escala: dezenas de entregáveis, múltiplas plataformas, gestão de contratos complexos, acompanhamento diário. Já operamos campanhas nesse formato e sabemos que o sucesso mora nos detalhes operacionais.",
  },
  {
    id: "M19",
    match: (i) => i.orcamento === "150k+" && i.prazo === "urgente",
    titulo: "Urgência Premium",
    texto: "Investimento alto com prazo apertado é viável — mas custa mais caro. Criadores de peso disponíveis no curto prazo cobram premium. A negociação e contratação acelerada exige alguém que saiba operar sob pressão sem comprometer qualidade.",
  },
  {
    id: "M20",
    match: (i) => i.objetivo >= 40 && i.objetivo <= 60,
    titulo: "Campanha Híbrida",
    texto: "Duplo objetivo exige dupla estratégia. Parte foca em awareness, parte em conversão. Funciona muito bem quando orquestrado — mas sem separar claramente os papéis, nenhum dos dois objetivos é atendido com excelência.",
  },
  {
    id: "M21",
    match: (i) => {
      const pc = Object.values(i.plataformas).filter(Boolean).length;
      return pc >= 3 && i.criadores > 5 && i.prazo === "urgente";
    },
    titulo: "Tempestade Perfeita",
    texto: "Muitos criadores, muitas plataformas, pouco tempo. Cada variável multiplica as anteriores. São dezenas de peças para aprovar em prazos comprimidos, com formatos diferentes. É a campanha que mais se beneficia de gestão profissional.",
  },
  {
    id: "M22",
    match: (i) => i.orcamento === "ate20k" && i.criadores === 1 && i.abrangencia === "nada-nichado" && i.prazo === "planejado" && (100 - i.objetivo) > 70,
    titulo: "Primeiro Passo Inteligente",
    texto: "Entrada calculada no mundo do influencer marketing. Um criador, produto de massa, sem pressa — espaço para aprender e testar. Mesmo aqui, ter orientação sobre seleção e contrato evita os erros clássicos de primeira campanha.",
  },
];

export function getBrandConclusion(inputs: BrandInputs): BrandConclusion {
  for (const rule of BRAND_CONCLUSIONS) {
    if (rule.match(inputs)) {
      return { id: rule.id, titulo: rule.titulo, texto: rule.texto };
    }
  }
  // Generic fallback
  return {
    id: "M0",
    titulo: "Sua Campanha",
    texto: "Cada campanha de influência tem particularidades que impactam o resultado. A combinação certa de criadores, plataformas e timing faz toda a diferença. É exatamente isso que uma agência especializada como a Seek otimiza para você.",
  };
}

// ── Influencer Mode Scoring ──

const FOLLOWER_SCORES: Record<FollowerRange, number> = {
  "<10k": 10, "10-50k": 30, "50-200k": 55, "200-500k": 75, "500k+": 95,
};

const ENGAGEMENT_SCORES: Record<EngagementRange, number> = {
  "0-5": 15, "5-10": 45, "10-15": 70, "15+": 95,
};

const NICHO_SCORES: Record<NichoLevel, number> = {
  "nada-nichado": 15, "pouco-nichado": 40, "nichado": 70, "muito-nichado": 95,
};

const EXPERIENCIA_SCORES: Record<ExperienciaMarcas, number> = {
  nunca: 10, poucas: 50, frequente: 90,
};

export function calculateInfluencerRadar(inputs: InfluencerInputs): InfluencerRadarData {
  const followerScore = FOLLOWER_SCORES[inputs.seguidores];
  const engagementScore = ENGAGEMENT_SCORES[inputs.engajamento];
  const platformCount = Object.values(inputs.plataformas).filter(Boolean).length;
  const nichoScore = NICHO_SCORES[inputs.nicho];
  const experienciaScore = EXPERIENCIA_SCORES[inputs.experiencia];

  // Monetização: followers 40% + engagement 35% + experience 25%
  const monetizacao = followerScore * 0.4 + engagementScore * 0.35 + experienciaScore * 0.25;

  // Versatilidade: platforms 40% + engagement 25% + nicho inverso 35% (menos nichado = mais versátil)
  const versatilidade = (platformCount * 20) * 0.4 + engagementScore * 0.25 + (100 - nichoScore) * 0.35;

  // Atratividade: nicho 30% + engagement 25% + followers 25% + experience 20%
  const atratividade = nichoScore * 0.3 + engagementScore * 0.25 + followerScore * 0.25 + experienciaScore * 0.2;

  return {
    monetizacao: scoreToLevel(Math.min(100, monetizacao)),
    versatilidade: scoreToLevel(Math.min(100, versatilidade)),
    atratividade: scoreToLevel(Math.min(100, atratividade)),
  };
}

export function calculateInfluencerBars(inputs: InfluencerInputs): InfluencerBars {
  const followerScore = FOLLOWER_SCORES[inputs.seguidores];
  const engagementScore = ENGAGEMENT_SCORES[inputs.engajamento];
  const platformCount = Object.values(inputs.plataformas).filter(Boolean).length;
  const nichoScore = NICHO_SCORES[inputs.nicho];
  const experienciaScore = EXPERIENCIA_SCORES[inputs.experiencia];

  // Demanda de mercado: engagement 35% + nicho 30% + followers 20% + experience 15%
  const demanda = engagementScore * 0.35 + nichoScore * 0.3 + followerScore * 0.2 + experienciaScore * 0.15;

  // Competitividade: followers 35% + nicho inverso 35% + platforms 30%
  const competitividade = followerScore * 0.35 + (100 - nichoScore) * 0.35 + (platformCount * 20) * 0.3;

  // Potencial de crescimento: engagement 40% + platforms 30% + experiencia inversa 30%
  const crescimento = engagementScore * 0.4 + (platformCount * 20) * 0.3 + (100 - experienciaScore) * 0.3;

  // Preparo para campanhas: experiencia 40% + engagement 30% + platforms 30%
  const preparo = experienciaScore * 0.4 + engagementScore * 0.3 + (platformCount * 20) * 0.3;

  return {
    demandaMercado: scoreToLevel(Math.min(100, demanda)),
    competitividadeNicho: scoreToLevel(Math.min(100, competitividade)),
    potencialCrescimento: scoreToLevel(Math.min(100, crescimento)),
    preparoCampanhas: scoreToLevel(Math.min(100, preparo)),
  };
}

// ── Influencer Conclusions (I1-I18) ──

interface InfluencerRule {
  id: string;
  match: (i: InfluencerInputs) => boolean;
  titulo: string;
  texto: string;
}

const isNichado = (n: NichoLevel) => n === "nichado" || n === "muito-nichado";

const INFLUENCER_CONCLUSIONS: InfluencerRule[] = [
  {
    id: "I1",
    match: (i) => i.seguidores === "<10k" && i.engajamento === "15+" && isNichado(i.nicho),
    titulo: "Nano com Ouro nas Mãos",
    texto: "Sua audiência é pequena mas a qualidade do engajamento é excepcional. Marcas de nicho buscam exatamente esse perfil. Não se preocupe com o número de seguidores; o valor está na conexão. São detalhes de posicionamento e precificação que fazem a diferença — e já desenvolvemos muitos criadores nessa fase.",
  },
  {
    id: "I2",
    match: (i) => i.seguidores === "<10k" && i.engajamento === "0-5",
    titulo: "Início da Jornada",
    texto: "Todo grande criador começou exatamente aqui. Nessa fase, números importam menos que consistência — postar regularmente, responder comentários, experimentar formatos. O engajamento vai subir quando você encontrar a voz certa.",
  },
  {
    id: "I3",
    match: (i) => i.seguidores === "<10k" && (i.engajamento === "5-10" || i.engajamento === "10-15"),
    titulo: "Semente Forte",
    texto: "Engajamento nessa faixa com audiência pequena é sinal de que o conteúdo funciona — falta escala. Foque em descobrir quais posts performam melhor e dobre a aposta. É um momento em que orientação estratégica acelera o que levaria meses sozinho.",
  },
  {
    id: "I4",
    match: (i) => i.seguidores === "10-50k" && (i.engajamento === "10-15" || i.engajamento === "15+") && i.nicho === "nichado",
    titulo: "Micro com Alto Valor",
    texto: "Perfil que mais cresce em demanda. Micro-influenciadores nichados com engajamento alto entregam resultados que criadores maiores não conseguem. Se ainda não começou com marcas, não se preocupe: o perfil está pronto, faltam as conexões certas.",
  },
  {
    id: "I5",
    match: (i) => i.seguidores === "10-50k" && i.engajamento === "0-5" && i.nicho === "nada-nichado",
    titulo: "Base sem Direção",
    texto: "Você tem audiência mas o engajamento sugere desconexão. Acontece quando o crescimento veio de trends ou viralizações. Definir um nicho mais claro pode parecer contraditório, mas costuma aumentar o engajamento e seu valor para marcas.",
  },
  {
    id: "I6",
    match: (i) => {
      const pc = Object.values(i.plataformas).filter(Boolean).length;
      return i.seguidores === "10-50k" && (i.engajamento === "5-10") && pc >= 2;
    },
    titulo: "Micro Multiplataforma",
    texto: "Presença em múltiplas plataformas com engajamento saudável é poderoso. Marcas adoram cross-posting. Se nunca trabalhou com marcas, não se preocupe com os detalhes de negociação — são coisas que se aprendem rápido com orientação certa.",
  },
  {
    id: "I7",
    match: (i) => i.seguidores === "50-200k" && (i.engajamento === "10-15" || i.engajamento === "15+") && isNichado(i.nicho),
    titulo: "Criador de Referência",
    texto: "Nessa faixa com esse engajamento em nicho definido, você é referência. A questão não é se vai trabalhar com marcas, é em que condições. Negociação de cachê, exclusividade, direitos de imagem — são detalhes que exigem experiência e que definem se a parceria é boa para você.",
  },
  {
    id: "I8",
    match: (i) => i.seguidores === "50-200k" && (i.engajamento === "5-10") && i.experiencia === "frequente",
    titulo: "Profissional Consolidando",
    texto: "Você já é profissional do mercado. O próximo passo é estruturar: mídia kit profissional, precificação consistente, contratos de longo prazo. É o ponto em que uma agência não te ensina a criar — te libera para focar só nisso enquanto cuida do resto.",
  },
  {
    id: "I9",
    match: (i) => i.seguidores === "50-200k" && i.engajamento === "0-5",
    titulo: "Alcance sem Profundidade",
    texto: "Audiência relevante mas engajamento indica desconexão. Antes de buscar mais campanhas, vale investir em reconectar com sua audiência — conteúdo pessoal, perguntas, bastidores. Marcas olham cada vez mais para engajamento real.",
  },
  {
    id: "I10",
    match: (i) => {
      const pc = Object.values(i.plataformas).filter(Boolean).length;
      return i.seguidores === "200-500k" && (i.engajamento === "5-10") && pc >= 2 && i.experiencia === "frequente";
    },
    titulo: "Criador de Elite",
    texto: "Topo do mercado mid-tier. Não é mais sobre conseguir campanhas, é sobre escolher as certas. Exclusividade, equity, contratos anuais, co-criação de produtos — oportunidades que exigem negociação estratégica.",
  },
  {
    id: "I11",
    match: (i) => i.seguidores === "200-500k" && i.engajamento === "0-5" && i.nicho === "nada-nichado",
    titulo: "Grande mas Diluído",
    texto: "Audiência grande, engajamento baixo e sem nicho é o perfil que mais perde valor. A boa notícia: você tem a base. A reconstrução passa por filtrar o conteúdo e assumir um posicionamento — quem fica é quem importa.",
  },
  {
    id: "I12",
    match: (i) => i.seguidores === "500k+" && (i.engajamento === "10-15" || i.engajamento === "15+"),
    titulo: "Unicórnio",
    texto: "Audiência grande com engajamento alto é estatisticamente raro. Você está em posição de negociar patrocínios premium, exclusividades e contratos de embaixador. Ter alguém cuidando da estratégia comercial é proteção do seu ativo mais importante.",
  },
  {
    id: "I13",
    match: (i) => i.seguidores === "500k+" && i.engajamento === "5-10",
    titulo: "Top Tier",
    texto: "Você está entre os maiores do mercado. O desafio não é falta de oportunidade — é excesso. Saber dizer não, negociar condições justas e manter a autenticidade é o que separa criadores que duram dos que saturam.",
  },
  {
    id: "I14",
    match: (i) => i.seguidores === "500k+" && i.engajamento === "0-5",
    titulo: "Gigante Adormecido",
    texto: "A audiência está lá, mas não responde. Marcas de performance vão hesitar, mas marcas de branding ainda vêem valor no alcance. O caminho é reconstruir a conexão — completamente possível com ajuste de conteúdo e estratégia.",
  },
  {
    id: "I15",
    match: (i) => {
      const pc = Object.values(i.plataformas).filter(Boolean).length;
      return pc === 1 && (i.engajamento === "10-15" || i.engajamento === "15+");
    },
    titulo: "Forte mas Vulnerável",
    texto: "Engajamento excelente, mas uma plataforma só é risco real. Diversificar para pelo menos 2 protege seu negócio e multiplica seu valor para marcas que querem multichannel.",
  },
  {
    id: "I16",
    match: (i) => i.experiencia === "nunca" && (i.engajamento === "5-10" || i.engajamento === "10-15" || i.engajamento === "15+"),
    titulo: "Pronto mas sem Experiência",
    texto: "Seu perfil tem potencial real para marcas. Não se preocupe com a falta de experiência: os detalhes que intimidam (precificação, contrato, briefing) são coisas que exigem experiência mas não são complicadas com orientação certa. Já desenvolvemos muitos criadores nessa transição.",
  },
  {
    id: "I17",
    match: (i) => i.experiencia === "nunca" && i.engajamento === "0-5",
    titulo: "Momento de Construção",
    texto: "Antes de pensar em marcas, vale fortalecer a base. Foco 100% em conteúdo e comunidade. Quando o engajamento subir consistentemente acima de 5%, as oportunidades aparecem naturalmente. E quando chegar a hora, a gente conversa.",
  },
  {
    id: "I18",
    match: (i) => i.seguidores === "50-200k" && isNichado(i.nicho) && i.experiencia === "poucas",
    titulo: "No Ponto de Virada",
    texto: "Exatamente o momento em que a maioria decide se vai levar a sério ou manter como hobby. Audiência relevante, nicho definido, algumas experiências. Os próximos 6-12 meses definem a trajetória. Com estrutura, esse perfil cresce exponencialmente.",
  },
];

export function getInfluencerConclusion(inputs: InfluencerInputs): InfluencerConclusion {
  for (const rule of INFLUENCER_CONCLUSIONS) {
    if (rule.match(inputs)) {
      return { id: rule.id, titulo: rule.titulo, texto: rule.texto };
    }
  }
  return {
    id: "I0",
    titulo: "Seu Perfil",
    texto: "Cada criador tem um caminho único. A combinação certa de nicho, engajamento e presença faz toda a diferença para atrair marcas e monetizar sua audiência. Vamos conversar sobre como estruturar seu próximo passo.",
  };
}

// ── Live Conclusions (L1-L8) ──

// Helper to map viewer ranges to numeric equivalents for comparison
function viewerRangeToScore(v: ViewerRange): number {
  const map: Record<ViewerRange, number> = { "<50": 25, "50-200": 125, "200-1000": 600, "1000-5000": 3000, "5000+": 7500 };
  return map[v];
}

function watchHoursToViewerEquivalent(h: WatchHoursRange): number {
  // Rough mapping of watch hours to equivalent viewer range scores
  const map: Record<WatchHoursRange, number> = { "<500h": 25, "500-5000h": 125, "5000-20000h": 600, "20000-100000h": 3000, "100000h+": 7500 };
  return map[h];
}

function getEffectiveViewerScore(inputs: InfluencerInputs): number {
  if (inputs.liveMetricMode === "espectadores") {
    return viewerRangeToScore(inputs.espectadores);
  }
  return watchHoursToViewerEquivalent(inputs.horasAssistidas);
}

interface LiveRule {
  id: string;
  match: (i: InfluencerInputs) => boolean;
  titulo: string;
  texto: string;
}

const LIVE_CONCLUSIONS: LiveRule[] = [
  {
    id: "L1",
    match: (i) => getEffectiveViewerScore(i) <= 25,
    titulo: "Live em Construção",
    texto: "Suas lives ainda estão ganhando tração. Nessa fase, o foco deve ser regularidade e interação — criar hábito na audiência de assistir ao vivo. Continue construindo.",
  },
  {
    id: "L2",
    match: (i) => {
      const vs = getEffectiveViewerScore(i);
      return vs >= 50 && vs <= 200 && isNichado(i.nicho);
    },
    titulo: "Live Nichada com Valor",
    texto: "Live com audiência nichada é ouro para marcas específicas. 50-200 espectadores atentos representam uma taxa de atenção que nenhum post de feed consegue. Adicionar isso ao seu mídia kit diferencia você de criadores que só fazem conteúdo gravado.",
  },
  {
    id: "L3",
    match: (i) => {
      const vs = getEffectiveViewerScore(i);
      return vs >= 100 && vs <= 1000 && (i.horasLiveMensais === "40-80h" || i.horasLiveMensais === "80h+");
    },
    titulo: "Streamer Semi-Pro",
    texto: "Você já opera como semi-profissional em live. Marcas de games, tech e energia começam a procurar ativamente. O volume de horas mostra comprometimento — falta estruturar a comercialização: quanto cobrar, que formatos oferecer, como integrar produtos.",
  },
  {
    id: "L4",
    match: (i) => {
      const vs = getEffectiveViewerScore(i);
      return vs >= 1000 && vs <= 5000;
    },
    titulo: "Streamer Profissional",
    texto: "Live com 1.000+ espectadores simultâneos coloca você em outro patamar. Patrocínios de stream, overlay de marcas, segmentos dedicados — formatos que pagam bem. O desafio é não saturar a live com publis e perder a autenticidade.",
  },
  {
    id: "L5",
    match: (i) => getEffectiveViewerScore(i) >= 5000,
    titulo: "Top Streamer",
    texto: "Audiência de 5.000+ é território de elite. Contratos anuais, exclusividades, patrocínios premium. Negociar nessa faixa sem representação profissional é deixar dinheiro e proteção na mesa.",
  },
  {
    id: "L6",
    match: (i) => {
      const vs = getEffectiveViewerScore(i);
      const livePlatforms = [i.plataformas.twitch, i.plataformas.youtube].filter(Boolean).length;
      return vs >= 100 && livePlatforms <= 1;
    },
    titulo: "Live Forte, Risco de Plataforma",
    texto: "Sua live performa bem, mas depende de uma única plataforma. Considerar simulcast ou diversificação protege seu investimento em live.",
  },
  {
    id: "L7",
    match: (i) => {
      const vs = getEffectiveViewerScore(i);
      return vs >= 50 && i.experiencia === "nunca";
    },
    titulo: "Live Monetizável mas Inexplorada",
    texto: "Você tem audiência ao vivo engajada e nunca monetizou com marcas. Marcas pagam por integração ao vivo e os valores podem surpreender. Já ajudamos streamers a fazer a transição sem comprometer a experiência da live.",
  },
  {
    id: "L8",
    match: (i) => {
      const vs = getEffectiveViewerScore(i);
      return i.horasLiveMensais === "80h+" && vs < 100;
    },
    titulo: "Muito Esforço, Pouco Retorno",
    texto: "Muitas horas de live com audiência baixa. Antes de aumentar o volume, vale avaliar: horário, consistência, nicho, divulgação prévia. Qualidade de audiência supera quantidade de horas.",
  },
];

export function getLiveConclusion(inputs: InfluencerInputs): LiveConclusion | null {
  if (!inputs.fazLives) return null;
  for (const rule of LIVE_CONCLUSIONS) {
    if (rule.match(inputs)) {
      return { id: rule.id, titulo: rule.titulo, texto: rule.texto };
    }
  }
  return null;
}

// ── Default Inputs ──
export const DEFAULT_PLATFORMS: PlatformFlags = {
  instagram: true, kick: false, kwai: false, tiktok: false,
  tiktokLive: false, twitch: false, twitter: false, youtube: false, youtubeLive: false,
};

export const DEFAULT_BRAND_INPUTS: BrandInputs = {
  objetivo: 50,
  orcamento: "20k-50k",
  prazo: "normal",
  criadores: 3,
  plataformas: { ...DEFAULT_PLATFORMS },
  abrangencia: "pouco-nichado",
};

export const DEFAULT_INFLUENCER_INPUTS: InfluencerInputs = {
  seguidores: "10-50k",
  engajamento: "5-10",
  plataformas: { ...DEFAULT_PLATFORMS },
  nicho: "pouco-nichado",
  experiencia: "poucas",
  fazLives: false,
  liveMetricMode: "espectadores",
  espectadores: "<50",
  horasAssistidas: "<500h",
  horasLiveMensais: "<10h",
};
