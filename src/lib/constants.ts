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
  { name: "Ronaldinho Gaúcho", handle: "@ronaldinho", slug: "ronaldinho", niche: "Esporte", followers: "155.3M", color: "#00F0D0" },
  { name: "Virgínia Fonseca", handle: "@virginia", slug: "virginia-fonseca", niche: "Lifestyle", followers: "50.2M", color: "#80F090" },
  { name: "Whindersson Nunes", handle: "@whindersson", slug: "whindersson-nunes", niche: "Humor", followers: "59.1M", color: "#D0F060" },
  { name: "Juliette Freire", handle: "@juliette", slug: "juliette-freire", niche: "Beleza", followers: "32.8M", color: "#E0F050" },
  { name: "Casimiro Miguel", handle: "@casimiro", slug: "casimiro-miguel", niche: "Esporte", followers: "15.7M", color: "#00F0D0" },
  { name: "Jade Picon", handle: "@jadepicon", slug: "jade-picon", niche: "Moda", followers: "22.4M", color: "#80F090" },
  { name: "Felipe Neto", handle: "@felipeneto", slug: "felipe-neto", niche: "Entretenimento", followers: "46.3M", color: "#D0F060" },
  { name: "Anitta", handle: "@anitta", slug: "anitta", niche: "Música", followers: "64.5M", color: "#E0F050" },
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
    slug: "nike-lancamento-chuteiras",
    influencer: "Ronaldinho Gaúcho",
    result: "2M views em 24h",
    description: "Campanha de lançamento da nova linha de chuteiras com conteúdo exclusivo para Instagram e TikTok.",
    metric: "2M",
    metricLabel: "views em 24h",
  },
  {
    brand: "Natura",
    slug: "natura-beleza-natural",
    influencer: "Juliette Freire",
    result: "+340% engajamento",
    description: "Série de conteúdos sobre beleza natural que gerou recorde de engajamento para a marca.",
    metric: "+340%",
    metricLabel: "engajamento",
  },
  {
    brand: "iFood",
    slug: "ifood-live-commerce",
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
    longDescription: "Nossa equipe especializada cuida de todo o processo: desde a identificação dos criadores ideais para sua marca, passando pela negociação e briefing, até o acompanhamento da produção e entrega dos relatórios de performance. Com um casting de mais de 500 influenciadores ativos, encontramos o match perfeito para cada campanha.",
    features: ["Curadoria personalizada de influenciadores", "Negociação e contratos", "Briefing e acompanhamento criativo", "Relatórios de performance detalhados"],
  },
  {
    title: "Produção Audiovisual",
    description: "Direção criativa, filmagem, edição e pós-produção. Conteúdos que capturam atenção e geram resultados.",
    icon: "video",
    longDescription: "Produzimos conteúdo de alta qualidade para todas as plataformas. Nossa equipe de produção conta com diretores criativos, cinegrafistas, editores e motion designers que entendem a linguagem de cada rede social e formato de conteúdo.",
    features: ["Direção criativa e roteiro", "Filmagem profissional", "Edição e pós-produção", "Motion design e animação"],
  },
  {
    title: "Estratégia e Planejamento",
    description: "Consultoria, mapeamento de influenciadores, análise de dados e planejamento de campanhas 360°.",
    icon: "strategy",
    longDescription: "Desenvolvemos estratégias baseadas em dados para maximizar o ROI das suas campanhas de influência. Analisamos seu mercado, público-alvo e concorrência para criar um plano de ação sob medida que conecte sua marca aos criadores certos, nos momentos certos.",
    features: ["Análise de mercado e benchmarking", "Mapeamento de público-alvo", "Planejamento de campanhas 360°", "Métricas e otimização contínua"],
  },
];

export const TEAM_MEMBERS = [
  { name: "Ana Silva", role: "CEO & Fundadora", bio: "15 anos de experiência em marketing digital e influência." },
  { name: "Carlos Mendes", role: "Diretor Criativo", bio: "Ex-diretor de conteúdo em grandes agências de publicidade." },
  { name: "Mariana Costa", role: "Head de Casting", bio: "Especialista em curadoria e gestão de talentos digitais." },
  { name: "Rafael Santos", role: "Head de Produção", bio: "Cinegrafista e editor com passagem por grandes emissoras." },
];

export const VALUES = [
  { title: "Autenticidade", description: "Acreditamos em conexões reais entre marcas e criadores. Cada campanha reflete a verdade da marca e do influenciador." },
  { title: "Resultados", description: "Não buscamos apenas números — buscamos impacto real. Cada métrica é acompanhada de perto para garantir performance." },
  { title: "Inovação", description: "Estamos sempre à frente das tendências. Testamos novos formatos, plataformas e abordagens para manter sua marca relevante." },
  { title: "Transparência", description: "Relatórios claros, comunicação aberta e processos documentados. Você sabe exatamente o que está acontecendo." },
];

export const CASTING_FILTERS = {
  niches: ["Todos", "Esporte", "Lifestyle", "Humor", "Beleza", "Moda", "Entretenimento", "Música", "Tech", "Gastronomia", "Fitness"],
  platforms: ["Todas", "Instagram", "TikTok", "YouTube", "Twitter"],
  sizes: ["Todos", "Nano (10-50K)", "Micro (50-500K)", "Médio (500K-1M)", "Macro (1-10M)", "Mega (10M+)"],
};

export const ALL_INFLUENCERS = [
  { name: "Ronaldinho Gaúcho", handle: "@ronaldinho", slug: "ronaldinho", niche: "Esporte", followers: "155.3M", engagement: "3.2%", platforms: ["Instagram", "TikTok"], bio: "Maior ícone do futebol brasileiro, conectando marcas com milhões de fãs ao redor do mundo.", color: "#00F0D0" },
  { name: "Virgínia Fonseca", handle: "@virginia", slug: "virginia-fonseca", niche: "Lifestyle", followers: "50.2M", engagement: "4.8%", platforms: ["Instagram", "YouTube", "TikTok"], bio: "Criadora de conteúdo e empresária, referência em lifestyle e maternidade no Brasil.", color: "#80F090" },
  { name: "Whindersson Nunes", handle: "@whindersson", slug: "whindersson-nunes", niche: "Humor", followers: "59.1M", engagement: "5.1%", platforms: ["YouTube", "Instagram", "TikTok"], bio: "Um dos maiores comediantes digitais do Brasil, com alcance massivo em múltiplas plataformas.", color: "#D0F060" },
  { name: "Juliette Freire", handle: "@juliette", slug: "juliette-freire", niche: "Beleza", followers: "32.8M", engagement: "6.2%", platforms: ["Instagram", "TikTok"], bio: "Fenômeno cultural e referência em beleza, autenticidade e representatividade nordestina.", color: "#E0F050" },
  { name: "Casimiro Miguel", handle: "@casimiro", slug: "casimiro-miguel", niche: "Esporte", followers: "15.7M", engagement: "8.5%", platforms: ["YouTube", "TikTok", "Instagram"], bio: "Maior streamer e comentarista esportivo do Brasil, referência em entretenimento ao vivo.", color: "#00F0D0" },
  { name: "Jade Picon", handle: "@jadepicon", slug: "jade-picon", niche: "Moda", followers: "22.4M", engagement: "4.1%", platforms: ["Instagram", "TikTok"], bio: "Influenciadora e modelo, referência em moda e tendências para a geração Z.", color: "#80F090" },
  { name: "Felipe Neto", handle: "@felipeneto", slug: "felipe-neto", niche: "Entretenimento", followers: "46.3M", engagement: "3.9%", platforms: ["YouTube", "Instagram", "Twitter"], bio: "Pioneiro do conteúdo digital brasileiro, com presença massiva em entretenimento e opinião.", color: "#D0F060" },
  { name: "Anitta", handle: "@anitta", slug: "anitta", niche: "Música", followers: "64.5M", engagement: "2.8%", platforms: ["Instagram", "TikTok", "YouTube"], bio: "Artista global e maior referência brasileira na indústria musical internacional.", color: "#E0F050" },
  { name: "Lucas Rangel", handle: "@lucasrangel", slug: "lucas-rangel", niche: "Humor", followers: "18.2M", engagement: "7.3%", platforms: ["TikTok", "Instagram", "YouTube"], bio: "Comediante digital com conteúdo viral e alto engajamento entre o público jovem.", color: "#00F0D0" },
  { name: "Camila Coelho", handle: "@camilacoelho", slug: "camila-coelho", niche: "Moda", followers: "10.1M", engagement: "3.5%", platforms: ["Instagram", "YouTube"], bio: "Influenciadora e empresária de moda, referência internacional em beleza e estilo.", color: "#80F090" },
  { name: "Eliezer", handle: "@eliezer", slug: "eliezer", niche: "Lifestyle", followers: "8.9M", engagement: "5.6%", platforms: ["Instagram", "TikTok"], bio: "Criador de conteúdo de lifestyle e paternidade, com forte conexão com seu público.", color: "#D0F060" },
  { name: "Gkay", handle: "@gaborrecidente", slug: "gkay", niche: "Humor", followers: "20.5M", engagement: "6.8%", platforms: ["Instagram", "TikTok", "YouTube"], bio: "Comediante e influenciadora, conhecida por seu conteúdo irreverente e eventos icônicos.", color: "#E0F050" },
];

export const ALL_CASES = [
  {
    brand: "Nike",
    slug: "nike-lancamento-chuteiras",
    influencer: "Ronaldinho Gaúcho",
    result: "2M views em 24h",
    description: "Campanha de lançamento da nova linha de chuteiras com conteúdo exclusivo para Instagram e TikTok.",
    longDescription: "A Nike buscava um lançamento impactante para sua nova linha de chuteiras. Desenvolvemos uma estratégia de conteúdo exclusivo com Ronaldinho Gaúcho, criando uma série de vídeos que mostravam o ícone do futebol testando os novos produtos em cenários icônicos. A campanha gerou viralização orgânica massiva.",
    metric: "2M",
    metricLabel: "views em 24h",
    platforms: ["Instagram", "TikTok"],
    duration: "2 semanas",
    results: [
      { label: "Views totais", value: "8.5M" },
      { label: "Engajamento", value: "+420%" },
      { label: "Menções à marca", value: "15.2K" },
      { label: "Cliques no link", value: "340K" },
    ],
  },
  {
    brand: "Natura",
    slug: "natura-beleza-natural",
    influencer: "Juliette Freire",
    result: "+340% engajamento",
    description: "Série de conteúdos sobre beleza natural que gerou recorde de engajamento para a marca.",
    longDescription: "Para a Natura, criamos uma campanha focada em autenticidade e beleza natural com Juliette Freire. A série de conteúdos mostrava a rotina de cuidados da influenciadora usando produtos Natura, com um tom genuíno que ressoou profundamente com seu público.",
    metric: "+340%",
    metricLabel: "engajamento",
    platforms: ["Instagram", "YouTube"],
    duration: "1 mês",
    results: [
      { label: "Engajamento", value: "+340%" },
      { label: "Alcance", value: "12M" },
      { label: "Salvamentos", value: "890K" },
      { label: "Conversões", value: "+180%" },
    ],
  },
  {
    brand: "iFood",
    slug: "ifood-live-commerce",
    influencer: "Casimiro Miguel",
    result: "5M impressões",
    description: "Ação de live commerce com integração direta ao app, gerando conversões em tempo real.",
    longDescription: "O iFood queria explorar o formato de live commerce no Brasil. Desenvolvemos uma ação com Casimiro Miguel que integrava diretamente o app do iFood durante a transmissão ao vivo, permitindo que os espectadores fizessem pedidos em tempo real enquanto assistiam ao conteúdo.",
    metric: "5M",
    metricLabel: "impressões",
    platforms: ["YouTube", "TikTok"],
    duration: "1 semana",
    results: [
      { label: "Impressões", value: "5M" },
      { label: "Pedidos na live", value: "23K" },
      { label: "Pico de audiência", value: "185K" },
      { label: "ROI", value: "4.2x" },
    ],
  },
];
