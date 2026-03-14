export const NAV_LINKS = [
  { label: "Simulador", href: "/simulador" },
  { label: "Sobre", href: "/sobre" },
  { label: "Casting", href: "/casting" },
  { label: "Cases", href: "/cases" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
] as const;

export const SOCIAL_LINKS = [
  { platform: "Instagram", href: "https://instagram.com/seekmedia", icon: "instagram" },
  { platform: "TikTok", href: "https://tiktok.com/@seekmedia", icon: "tiktok" },
  { platform: "LinkedIn", href: "https://linkedin.com/company/seekmedia", icon: "linkedin" },
  { platform: "YouTube", href: "https://youtube.com/@seekmedia", icon: "youtube" },
] as const;

export const CLIENT_LOGOS = [
  "Coca-Cola",
  "Nike",
  "Samsung",
  "Natura",
  "Ambev",
  "Magazine Luiza",
  "iFood",
  "Nubank",
  "Globo",
  "Adidas",
];

export const FEATURED_INFLUENCERS = [
  { name: "Ronaldinho Gaúcho", handle: "@ronaldinho", niche: "Esporte", followers: "155.3M", color: "#00F0D0" },
  { name: "Virgínia Fonseca", handle: "@virginia", niche: "Lifestyle", followers: "50.2M", color: "#80F090" },
  { name: "Whindersson Nunes", handle: "@whindersson", niche: "Humor", followers: "59.1M", color: "#D0F060" },
  { name: "Juliette Freire", handle: "@juliette", niche: "Beleza", followers: "32.8M", color: "#E0F050" },
  { name: "Casimiro Miguel", handle: "@casimiro", niche: "Esporte", followers: "15.7M", color: "#00F0D0" },
  { name: "Jade Picon", handle: "@jadepicon", niche: "Moda", followers: "22.4M", color: "#80F090" },
  { name: "Felipe Neto", handle: "@felipeneto", niche: "Entretenimento", followers: "46.3M", color: "#D0F060" },
  { name: "Anitta", handle: "@anitta", niche: "Música", followers: "64.5M", color: "#E0F050" },
];

export const COUNTERS = [
  { value: 500, suffix: "+", label: "Influenciadores" },
  { value: 1200, suffix: "+", label: "Campanhas" },
  { value: 300, suffix: "+", label: "Marcas Atendidas" },
  { value: 17.9, suffix: "M+", label: "Alcance em Impressões", decimals: 1 },
];

export const FEATURED_CASES = [
  {
    brand: "Nike",
    influencer: "Ronaldinho Gaúcho",
    result: "2M views em 24h",
    description: "Campanha de lançamento da nova linha de chuteiras com conteúdo exclusivo para Instagram e TikTok.",
    metric: "2M",
    metricLabel: "views em 24h",
  },
  {
    brand: "Natura",
    influencer: "Juliette Freire",
    result: "+340% engajamento",
    description: "Série de conteúdos sobre beleza natural que gerou recorde de engajamento para a marca.",
    metric: "+340%",
    metricLabel: "engajamento",
  },
  {
    brand: "iFood",
    influencer: "Casimiro Miguel",
    result: "5M impressões",
    description: "Ação de live commerce com integração direta ao app, gerando conversões em tempo real.",
    metric: "5M",
    metricLabel: "impressões",
  },
];

export const SERVICES = [
  {
    title: "Gestão de Influenciadores",
    description: "Seleção, curadoria e gestão completa de campanhas com os maiores criadores do Brasil. Do briefing ao relatório final.",
    icon: "users",
  },
  {
    title: "Produção Audiovisual",
    description: "Direção criativa, filmagem, edição e pós-produção. Conteúdos que capturam atenção e geram resultados.",
    icon: "video",
  },
  {
    title: "Estratégia e Planejamento",
    description: "Consultoria, mapeamento de influenciadores, análise de dados e planejamento de campanhas 360°.",
    icon: "strategy",
  },
];
