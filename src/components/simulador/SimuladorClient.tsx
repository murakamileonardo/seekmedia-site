"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { RadarChart } from "./RadarChart";
import { LeadCapturePopup } from "./LeadCapturePopup";
import type { RadarAxis } from "./RadarChart";
import {
  type BrandInputs,
  type InfluencerInputs,
  type PlatformFlags,
  type QualitativeLevel,
  type BudgetRange,
  type Prazo,
  type Abrangencia,
  type FollowerRange,
  type EngagementRange,
  type NichoLevel,
  type ExperienciaMarcas,
  type ViewerRange,
  type WatchHoursRange,
  type LiveHoursRange,
  LIVE_PLATFORM_KEYS,
  calculateBrandRadar,
  calculateBrandBars,
  getBrandConclusion,
  calculateInfluencerRadar,
  calculateInfluencerBars,
  getInfluencerConclusion,
  getLiveConclusion,
  levelToPercent,
  BUDGET_LABELS,
  BUDGET_DESCRIPTIONS,
  PRAZO_LABELS,
  PRAZO_DESCRIPTIONS,
  ABRANGENCIA_LABELS,
  FOLLOWER_LABELS,
  ENGAGEMENT_LABELS,
  ENGAGEMENT_DESCRIPTIONS,
  NICHO_LABELS,
  EXPERIENCIA_LABELS,
  VIEWER_LABELS,
  WATCH_HOURS_LABELS,
  LIVE_HOURS_LABELS,
  DEFAULT_BRAND_INPUTS,
  DEFAULT_INFLUENCER_INPUTS,
} from "@/lib/simulador";

type Mode = "marca" | "influenciador";

// ── All platforms in alphabetical order ──
const ALL_PLATFORMS: { key: keyof PlatformFlags; label: string }[] = [
  { key: "instagram", label: "Instagram" },
  { key: "kick", label: "KICK" },
  { key: "kwai", label: "Kwai" },
  { key: "tiktok", label: "TikTok" },
  { key: "tiktokLive", label: "TikTok Live" },
  { key: "twitch", label: "Twitch" },
  { key: "twitter", label: "X / Twitter" },
  { key: "youtube", label: "YouTube" },
  { key: "youtubeLive", label: "YouTube Live" },
];

// ── Shared UI Components ──

function DialSelector<T extends string>({
  label,
  hint,
  value,
  options,
  labels,
  descriptions,
  onChange,
}: {
  label: string;
  hint?: string;
  value: T;
  options: T[];
  labels: Record<T, string>;
  descriptions?: Record<T, string>;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
              value === opt
                ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
            }`}
          >
            {labels[opt]}
          </button>
        ))}
      </div>
      {/* Show description of selected option below buttons */}
      {descriptions && descriptions[value] && (
        <p className="text-[11px] text-[var(--color-accent-cyan)]/70 mt-1.5 italic">{descriptions[value]}</p>
      )}
      {hint && <p className="text-[10px] text-[var(--color-text-muted)] mt-1 leading-relaxed">{hint}</p>}
    </div>
  );
}

function TogglePlatforms({
  platforms,
  onChange,
  options,
}: {
  platforms: PlatformFlags;
  onChange: (platforms: PlatformFlags) => void;
  options: { key: keyof PlatformFlags; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Plataformas</label>
      <div className="flex flex-wrap gap-2">
        {options.map((p) => (
          <button
            key={p.key}
            onClick={() => onChange({ ...platforms, [p.key]: !platforms[p.key] })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
              platforms[p.key]
                ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
        Cada plataforma adicional multiplica os entregáveis — formatos, dimensões e linguagem são diferentes em cada uma.
      </p>
    </div>
  );
}

function LiveToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-[var(--color-text)]">Faz Lives?</span>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-medium ${!value ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>Não</span>
        <button
          onClick={() => onChange(!value)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
            value ? "bg-[var(--color-accent-cyan)]" : "bg-[var(--color-border)]"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
              value ? "translate-x-5" : ""
            }`}
          />
        </button>
        <span className={`text-xs font-medium ${value ? "text-[var(--color-accent-cyan)]" : "text-[var(--color-text-muted)]"}`}>Sim</span>
      </div>
    </div>
  );
}

function SliderInput({
  label,
  hint,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (v: number) => void;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-[var(--color-text)]">{label}</label>
        <span className="text-sm font-semibold text-[var(--color-accent-cyan)]">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00F0D0 0%, #80F090 ${percent}%, #2E3A3A ${percent}%, #2E3A3A 100%)`,
        }}
      />
      {hint && <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5 leading-relaxed">{hint}</p>}
    </div>
  );
}

function QualitativeBar({ label, level }: { label: string; level: QualitativeLevel }) {
  const percent = levelToPercent(level);
  const colorMap: Record<QualitativeLevel, string> = {
    "Baixo": "#80F090",
    "Médio": "#D0F060",
    "Alto": "#F0A030",
    "Muito Alto": "#EF4444",
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: colorMap[level], backgroundColor: `${colorMap[level]}15` }}>
          {level}
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            background: `linear-gradient(90deg, #00F0D0, ${colorMap[level]})`,
          }}
        />
      </div>
    </div>
  );
}

// ── Objective Slider (Branding ↔ Performance) ──

function ObjectiveSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const brandingPercent = 100 - value;
  const performancePercent = value;
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Objetivo da Campanha</label>
      <div className="flex justify-between items-center mb-1.5">
        <span className={`text-xs font-medium ${brandingPercent > performancePercent ? "text-[var(--color-accent-cyan)]" : "text-[var(--color-text-muted)]"}`}>
          Branding {brandingPercent}%
        </span>
        <span className={`text-xs font-medium ${performancePercent > brandingPercent ? "text-[var(--color-accent-cyan)]" : "text-[var(--color-text-muted)]"}`}>
          Performance {performancePercent}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00F0D0 0%, #80F090 50%, #D0F060 100%)`,
        }}
      />
      <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
        Branding foca em ser lembrado. Performance foca em vender agora. A maioria das campanhas eficazes combina os dois em proporções diferentes.
      </p>
    </div>
  );
}

// ── AI Processing Animation ──

function ProcessingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      {/* Animated dots */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-accent-cyan)]/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-[var(--color-accent-cyan)]/40 animate-ping" style={{ animationDelay: "0.2s" }} />
        <div className="absolute inset-4 rounded-full border-2 border-[var(--color-accent-cyan)]/60 animate-ping" style={{ animationDelay: "0.4s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--color-accent-cyan)] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-[var(--color-accent-cyan)] mb-1">Analisando cenário...</p>
        <p className="text-xs text-[var(--color-text-muted)]">Processando parâmetros com inteligência artificial</p>
      </div>
    </div>
  );
}

// ── Generate Button ──

function GenerateButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-green)] hover:opacity-90 transition-all duration-300 cursor-pointer disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Gerar Simulação
    </button>
  );
}

// ── Main Component ──

export function SimuladorClient() {
  const [mode, setMode] = useState<Mode>("marca");
  const [brandInputs, setBrandInputs] = useState<BrandInputs>(DEFAULT_BRAND_INPUTS);
  const [influencerInputs, setInfluencerInputs] = useState<InfluencerInputs>(DEFAULT_INFLUENCER_INPUTS);

  // Result generation state
  const [showBrandResult, setShowBrandResult] = useState(false);
  const [showInfluencerResult, setShowInfluencerResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Lead capture tracking
  const [paramsChanged, setParamsChanged] = useState(0);
  const conclusionRef = useRef<HTMLDivElement>(null);

  const trackParamChange = useCallback(() => {
    setParamsChanged((prev) => prev + 1);
  }, []);

  const updateBrand = <K extends keyof BrandInputs>(key: K, value: BrandInputs[K]) => {
    setBrandInputs((prev) => ({ ...prev, [key]: value }));
    trackParamChange();
    setShowBrandResult(false); // Reset results on input change
  };

  const updateInfluencer = <K extends keyof InfluencerInputs>(key: K, value: InfluencerInputs[K]) => {
    setInfluencerInputs((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-enable lives if a live platform is selected
      if (key === "plataformas") {
        const plats = value as PlatformFlags;
        const hasLivePlatform = LIVE_PLATFORM_KEYS.some((k) => plats[k]);
        if (hasLivePlatform && !prev.fazLives) {
          next.fazLives = true;
        }
      }
      return next;
    });
    trackParamChange();
    setShowInfluencerResult(false); // Reset results on input change
  };

  const handleGenerate = useCallback(() => {
    setIsProcessing(true);
    // Simulate AI processing delay
    setTimeout(() => {
      setIsProcessing(false);
      if (mode === "marca") setShowBrandResult(true);
      else setShowInfluencerResult(true);
    }, 1800);
  }, [mode]);

  // Get current simulator state for lead popup
  const getSimulatorState = useCallback(() => {
    if (mode === "marca") {
      const conclusion = getBrandConclusion(brandInputs);
      return {
        modo: "Marca" as const,
        params: brandInputs,
        conclusao: `${conclusion.titulo}: ${conclusion.texto}`,
      };
    } else {
      const conclusion = getInfluencerConclusion(influencerInputs);
      const live = getLiveConclusion(influencerInputs);
      return {
        modo: "Influenciador" as const,
        params: influencerInputs,
        conclusao: `${conclusion.titulo}: ${conclusion.texto}${live ? ` | Live: ${live.titulo}: ${live.texto}` : ""}`,
      };
    }
  }, [mode, brandInputs, influencerInputs]);

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
          <button
            onClick={() => { setMode("marca"); setShowInfluencerResult(false); }}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              mode === "marca"
                ? "bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-green)] text-black"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Sou uma Marca
          </button>
          <button
            onClick={() => { setMode("influenciador"); setShowBrandResult(false); }}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              mode === "influenciador"
                ? "bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-green)] text-black"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Sou Influenciador
          </button>
        </div>
      </div>

      {mode === "marca" ? (
        <BrandMode
          inputs={brandInputs}
          onUpdate={updateBrand}
          conclusionRef={conclusionRef}
          showResult={showBrandResult}
          isProcessing={isProcessing}
          onGenerate={handleGenerate}
        />
      ) : (
        <InfluencerMode
          inputs={influencerInputs}
          onUpdate={updateInfluencer}
          conclusionRef={conclusionRef}
          showResult={showInfluencerResult}
          isProcessing={isProcessing}
          onGenerate={handleGenerate}
        />
      )}

      {/* Lead Capture Popup */}
      <LeadCapturePopup
        paramsChanged={paramsChanged}
        conclusionRef={conclusionRef}
        getSimulatorState={getSimulatorState}
      />
    </div>
  );
}

// ── Brand Mode ──

function BrandMode({
  inputs,
  onUpdate,
  conclusionRef,
  showResult,
  isProcessing,
  onGenerate,
}: {
  inputs: BrandInputs;
  onUpdate: <K extends keyof BrandInputs>(key: K, value: BrandInputs[K]) => void;
  conclusionRef: React.RefObject<HTMLDivElement | null>;
  showResult: boolean;
  isProcessing: boolean;
  onGenerate: () => void;
}) {
  const radar = useMemo(() => calculateBrandRadar(inputs), [inputs]);
  const bars = useMemo(() => calculateBrandBars(inputs), [inputs]);
  const conclusion = useMemo(() => getBrandConclusion(inputs), [inputs]);

  const radarAxes: RadarAxis[] = [
    { label: "Alcance", level: radar.alcancePotencial },
    { label: "Engajamento", level: radar.engajamentoEsperado },
    { label: "Complexidade", level: radar.complexidadeGestao },
    { label: "Velocidade", level: radar.velocidadeResultado },
    { label: "Risco", level: radar.riscoExecucao },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">Configure sua campanha</h3>

        <ObjectiveSlider value={inputs.objetivo} onChange={(v) => onUpdate("objetivo", v)} />

        <DialSelector
          label="Orçamento Disponível"
          hint="O orçamento define não só o alcance, mas o nível dos criadores acessíveis e a qualidade da produção."
          value={inputs.orcamento}
          options={["ate20k", "20k-50k", "50k-150k", "150k+"] as BudgetRange[]}
          labels={BUDGET_LABELS}
          descriptions={BUDGET_DESCRIPTIONS}
          onChange={(v) => onUpdate("orcamento", v)}
        />

        <DialSelector
          label="Prazo"
          hint="Prazo impacta diretamente na disponibilidade de criadores e na qualidade do conteúdo. Campanhas planejadas com antecedência têm sistematicamente melhores resultados."
          value={inputs.prazo}
          options={["urgente", "normal", "planejado"] as Prazo[]}
          labels={PRAZO_LABELS}
          descriptions={PRAZO_DESCRIPTIONS}
          onChange={(v) => onUpdate("prazo", v)}
        />

        <SliderInput
          label="Quantidade de Criadores"
          hint="Mais criadores = mais alcance, mas também mais gestão. Cada criador adicional multiplica briefings, aprovações e prazos."
          value={inputs.criadores}
          min={1}
          max={10}
          step={1}
          displayValue={inputs.criadores >= 10 ? "10+" : String(inputs.criadores)}
          onChange={(v) => onUpdate("criadores", v)}
        />

        <TogglePlatforms
          platforms={inputs.plataformas}
          onChange={(p) => onUpdate("plataformas", p)}
          options={ALL_PLATFORMS}
        />

        <DialSelector
          label="Abrangência do Produto"
          hint="Produtos nichados alcançam audiências mais qualificadas, mas reduzem o pool de criadores disponíveis e podem exigir negociações mais complexas."
          value={inputs.abrangencia}
          options={["nada-nichado", "pouco-nichado", "nichado", "muito-nichado"] as Abrangencia[]}
          labels={ABRANGENCIA_LABELS}
          onChange={(v) => onUpdate("abrangencia", v)}
        />

        <GenerateButton onClick={onGenerate} disabled={isProcessing} />
      </div>

      {/* Output */}
      <div className="space-y-6">
        {isProcessing ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
            <ProcessingAnimation />
          </div>
        ) : showResult ? (
          <>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6 text-center">
                Análise da Campanha
              </h3>
              <RadarChart axes={radarAxes} />
            </div>

            {/* Bars */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8 space-y-5">
              <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">Aspectos Operacionais</h4>
              <QualitativeBar label="Volume de entregáveis a gerenciar" level={bars.volumeEntregaveis} />
              <QualitativeBar label="Dificuldade de encontrar criadores adequados" level={bars.dificuldadeCriadores} />
              <QualitativeBar label="Intensidade de negociação" level={bars.intensidadeNegociacao} />
              <QualitativeBar label="Necessidade de acompanhamento diário" level={bars.necessidadeAcompanhamento} />
            </div>

            {/* Conclusion */}
            <div ref={conclusionRef} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
              <h4 className="text-sm font-semibold text-[var(--color-accent-cyan)] mb-1">{conclusion.titulo}</h4>
              <p className="text-[var(--color-text)] leading-relaxed mb-6 text-sm">
                {conclusion.texto}
              </p>
              <Button variant="primary" href="/contato">
                Montar essa campanha com a Seek
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8 flex flex-col items-center justify-center py-20 text-center">
            <svg className="w-12 h-12 text-[var(--color-text-muted)]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm text-[var(--color-text-muted)]">Configure os parâmetros e clique em</p>
            <p className="text-sm font-semibold text-[var(--color-accent-cyan)]">&ldquo;Gerar Simulação&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Influencer Mode ──

function InfluencerMode({
  inputs,
  onUpdate,
  conclusionRef,
  showResult,
  isProcessing,
  onGenerate,
}: {
  inputs: InfluencerInputs;
  onUpdate: <K extends keyof InfluencerInputs>(key: K, value: InfluencerInputs[K]) => void;
  conclusionRef: React.RefObject<HTMLDivElement | null>;
  showResult: boolean;
  isProcessing: boolean;
  onGenerate: () => void;
}) {
  const radar = useMemo(() => calculateInfluencerRadar(inputs), [inputs]);
  const bars = useMemo(() => calculateInfluencerBars(inputs), [inputs]);
  const conclusion = useMemo(() => getInfluencerConclusion(inputs), [inputs]);
  const liveConclusion = useMemo(() => getLiveConclusion(inputs), [inputs]);

  const radarAxes: RadarAxis[] = [
    { label: "Monetização", level: radar.monetizacao },
    { label: "Versatilidade", level: radar.versatilidade },
    { label: "Atratividade", level: radar.atratividade },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">Sobre seu perfil</h3>

        <DialSelector
          label="Seguidores Totais"
          hint="Número de seguidores é importante, mas não é tudo. Marcas olham cada vez mais para engajamento e nicho."
          value={inputs.seguidores}
          options={["<10k", "10-50k", "50-200k", "200-500k", "500k+"] as FollowerRange[]}
          labels={FOLLOWER_LABELS}
          onChange={(v) => onUpdate("seguidores", v)}
        />

        <DialSelector
          label="Taxa de Engajamento"
          hint="Engajamento mede a qualidade da conexão com sua audiência. É o indicador que marcas mais valorizam."
          value={inputs.engajamento}
          options={["0-5", "5-10", "10-15", "15+"] as EngagementRange[]}
          labels={ENGAGEMENT_LABELS}
          descriptions={ENGAGEMENT_DESCRIPTIONS}
          onChange={(v) => onUpdate("engajamento", v)}
        />

        <TogglePlatforms
          platforms={inputs.plataformas}
          onChange={(p) => onUpdate("plataformas", p)}
          options={ALL_PLATFORMS}
        />

        {/* Lives toggle — right below platforms */}
        <LiveToggle value={inputs.fazLives} onChange={(v) => onUpdate("fazLives", v)} />

        {inputs.fazLives && (
          <div className="space-y-4 pl-2 border-l-2 border-[var(--color-accent-cyan)]/20">
            {/* Metric Mode Toggle */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Métrica de Live</label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate("liveMetricMode", "espectadores")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    inputs.liveMetricMode === "espectadores"
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                      : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }`}
                >
                  Espectadores simultâneos
                </button>
                <button
                  onClick={() => onUpdate("liveMetricMode", "horas-assistidas")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    inputs.liveMetricMode === "horas-assistidas"
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                      : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }`}
                >
                  Horas assistidas/mês
                </button>
              </div>
            </div>

            {inputs.liveMetricMode === "espectadores" ? (
              <DialSelector
                label="Média de espectadores simultâneos"
                value={inputs.espectadores}
                options={["<50", "50-200", "200-1000", "1000-5000", "5000+"] as ViewerRange[]}
                labels={VIEWER_LABELS}
                onChange={(v) => onUpdate("espectadores", v)}
              />
            ) : (
              <DialSelector
                label="Horas assistidas mensais"
                value={inputs.horasAssistidas}
                options={["<500h", "500-5000h", "5000-20000h", "20000-100000h", "100000h+"] as WatchHoursRange[]}
                labels={WATCH_HOURS_LABELS}
                onChange={(v) => onUpdate("horasAssistidas", v)}
              />
            )}

            <DialSelector
              label="Horas de Live Mensais"
              hint="Consistência em live é tão importante quanto audiência. Marcas valorizam streamers com horário regular e frequência previsível."
              value={inputs.horasLiveMensais}
              options={["<10h", "10-20h", "20-40h", "40-80h", "80h+"] as LiveHoursRange[]}
              labels={LIVE_HOURS_LABELS}
              onChange={(v) => onUpdate("horasLiveMensais", v)}
            />
          </div>
        )}

        <DialSelector
          label="Nicho"
          hint="Criadores com nicho definido são mais valiosos para marcas específicas — mesmo com menos seguidores."
          value={inputs.nicho}
          options={["nada-nichado", "pouco-nichado", "nichado", "muito-nichado"] as NichoLevel[]}
          labels={NICHO_LABELS}
          onChange={(v) => onUpdate("nicho", v)}
        />

        <DialSelector
          label="Experiência com Marcas"
          hint="Experiência com marcas demonstra profissionalismo e facilita novas parcerias."
          value={inputs.experiencia}
          options={["nunca", "poucas", "frequente"] as ExperienciaMarcas[]}
          labels={EXPERIENCIA_LABELS}
          onChange={(v) => onUpdate("experiencia", v)}
        />

        <GenerateButton onClick={onGenerate} disabled={isProcessing} />
      </div>

      {/* Output */}
      <div className="space-y-6">
        {isProcessing ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
            <ProcessingAnimation />
          </div>
        ) : showResult ? (
          <>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6 text-center">
                Seu Perfil
              </h3>
              <RadarChart axes={radarAxes} />
            </div>

            {/* Bars */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8 space-y-5">
              <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">Indicadores</h4>
              <QualitativeBar label="Demanda de mercado para seu perfil" level={bars.demandaMercado} />
              <QualitativeBar label="Competitividade no seu nicho" level={bars.competitividadeNicho} />
              <QualitativeBar label="Potencial de crescimento" level={bars.potencialCrescimento} />
              <QualitativeBar label="Preparo para campanhas profissionais" level={bars.preparoCampanhas} />
            </div>

            {/* Conclusion */}
            <div ref={conclusionRef} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
              <h4 className="text-sm font-semibold text-[var(--color-accent-cyan)] mb-1">{conclusion.titulo}</h4>
              <p className="text-[var(--color-text)] leading-relaxed text-sm mb-4">
                {conclusion.texto}
              </p>

              {liveConclusion && (
                <div className="border-t border-[var(--color-border)] pt-4 mt-4">
                  <h4 className="text-sm font-semibold text-[var(--color-accent-green)] mb-1">{liveConclusion.titulo}</h4>
                  <p className="text-[var(--color-text)] leading-relaxed text-sm mb-4">
                    {liveConclusion.texto}
                  </p>
                </div>
              )}

              <Button variant="primary" href="/contato">
                Fale com a Seek
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8 flex flex-col items-center justify-center py-20 text-center">
            <svg className="w-12 h-12 text-[var(--color-text-muted)]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-sm text-[var(--color-text-muted)]">Configure os parâmetros e clique em</p>
            <p className="text-sm font-semibold text-[var(--color-accent-cyan)]">&ldquo;Gerar Simulação&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
