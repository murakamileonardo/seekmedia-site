"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { RadarChart } from "./RadarChart";
import { GaugeChart } from "./GaugeChart";
import {
  type BrandInputs,
  type InfluencerInputs,
  type InfluencerSize,
  type ContentType,
  type CampaignDuration,
  type BrandSize,
  type NicheLevel,
  type BudgetRange,
  type FollowerRange,
  type PostFrequency,
  type NicheDefined,
  type BrandExperience,
  calculateRadar,
  getBrandConclusion,
  calculateInfluencerOutput,
  getInfluencerMessage,
  INFLUENCER_SIZE_LABELS,
  CONTENT_TYPE_LABELS,
  DURATION_LABELS,
  BRAND_SIZE_LABELS,
  BUDGET_LABELS,
  FOLLOWER_LABELS,
  FREQUENCY_LABELS,
} from "@/lib/simulador";

type Mode = "marca" | "influenciador";

// ── Shared UI Components ──

function DialSelector<T extends string>({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  labels: Record<T, string>;
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
    </div>
  );
}

function TogglePlatforms({
  platforms,
  onChange,
  showTwitter = false,
}: {
  platforms: Record<string, boolean>;
  onChange: (platforms: Record<string, boolean>) => void;
  showTwitter?: boolean;
}) {
  const platformList = showTwitter
    ? ["instagram", "tiktok", "youtube", "twitter"]
    : ["instagram", "tiktok", "youtube"];
  const platformLabels: Record<string, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
    twitter: "Twitter/X",
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Plataformas</label>
      <div className="flex flex-wrap gap-2">
        {platformList.map((p) => (
          <button
            key={p}
            onClick={() => onChange({ ...platforms, [p]: !platforms[p] })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
              platforms[p]
                ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
            }`}
          >
            {platformLabels[p]}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
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
    </div>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}: {
  label: string;
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
    </div>
  );
}

function BarIndicator({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
        <span className="text-sm font-semibold text-[var(--color-accent-cyan)]">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${value}%`,
            background: "linear-gradient(90deg, #00F0D0, #80F090, #D0F060)",
          }}
        />
      </div>
    </div>
  );
}

// ── Main Component ──

export function SimuladorClient() {
  const [mode, setMode] = useState<Mode>("marca");

  // Brand mode state
  const [brandInputs, setBrandInputs] = useState<BrandInputs>({
    description: "",
    influencerSize: "micro",
    quantity: 3,
    platforms: { instagram: true, tiktok: false, youtube: false },
    contentType: "reels",
    duration: "1mes",
    exclusivity: false,
    brandSize: "startup",
    nicheLevel: 3 as NicheLevel,
    budgetRange: "explorando",
  });

  // Influencer mode state
  const [influencerInputs, setInfluencerInputs] = useState<InfluencerInputs>({
    description: "",
    followers: "50k",
    engagementRate: 5,
    platforms: { instagram: true, tiktok: false, youtube: false, twitter: false },
    frequency: "2-3x",
    nicheDefined: "mais-ou-menos",
    brandExperience: "algumas",
  });

  // Computed outputs
  const radarData = useMemo(() => calculateRadar(brandInputs), [brandInputs]);
  const brandConclusion = useMemo(() => getBrandConclusion(radarData.complexidade), [radarData.complexidade]);
  const influencerOutput = useMemo(() => calculateInfluencerOutput(influencerInputs), [influencerInputs]);
  const influencerMsg = useMemo(() => getInfluencerMessage(influencerOutput.score), [influencerOutput.score]);

  const updateBrand = <K extends keyof BrandInputs>(key: K, value: BrandInputs[K]) =>
    setBrandInputs((prev) => ({ ...prev, [key]: value }));

  const updateInfluencer = <K extends keyof InfluencerInputs>(key: K, value: InfluencerInputs[K]) =>
    setInfluencerInputs((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
          <button
            onClick={() => setMode("marca")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              mode === "marca"
                ? "bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-green)] text-black"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Sou uma Marca
          </button>
          <button
            onClick={() => setMode("influenciador")}
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
          radarData={radarData}
          conclusion={brandConclusion}
          onUpdate={updateBrand}
        />
      ) : (
        <InfluencerMode
          inputs={influencerInputs}
          output={influencerOutput}
          message={influencerMsg}
          onUpdate={updateInfluencer}
        />
      )}
    </div>
  );
}

// ── Brand Mode ──

function BrandMode({
  inputs,
  radarData,
  conclusion,
  onUpdate,
}: {
  inputs: BrandInputs;
  radarData: ReturnType<typeof calculateRadar>;
  conclusion: ReturnType<typeof getBrandConclusion>;
  onUpdate: <K extends keyof BrandInputs>(key: K, value: BrandInputs[K]) => void;
}) {
  const complexityPercent = radarData.complexidade;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">Configure sua campanha</h3>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Descreva seu produto/campanha
          </label>
          <input
            type="text"
            maxLength={200}
            value={inputs.description}
            onChange={(e) => onUpdate("description", e.target.value)}
            placeholder="Ex: App de delivery de comida saudável"
            className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-cyan)]/50 transition-colors"
          />
          <span className="text-xs text-[var(--color-text-muted)] mt-1 block">{inputs.description.length}/200</span>
        </div>

        <DialSelector
          label="Tamanho do Influenciador"
          value={inputs.influencerSize}
          options={["nano", "micro", "medio", "macro", "mega"] as InfluencerSize[]}
          labels={INFLUENCER_SIZE_LABELS}
          onChange={(v) => onUpdate("influencerSize", v)}
        />

        <SliderInput
          label="Quantidade"
          value={inputs.quantity}
          min={1}
          max={10}
          step={1}
          displayValue={inputs.quantity >= 10 ? "10+" : String(inputs.quantity)}
          onChange={(v) => onUpdate("quantity", v)}
        />

        <TogglePlatforms
          platforms={inputs.platforms}
          onChange={(p) => onUpdate("platforms", p as BrandInputs["platforms"])}
        />

        <DialSelector
          label="Tipo de Conteúdo"
          value={inputs.contentType}
          options={["stories", "feed", "reels", "video"] as ContentType[]}
          labels={CONTENT_TYPE_LABELS}
          onChange={(v) => onUpdate("contentType", v)}
        />

        <DialSelector
          label="Duração"
          value={inputs.duration}
          options={["1sem", "1mes", "3meses", "6meses"] as CampaignDuration[]}
          labels={DURATION_LABELS}
          onChange={(v) => onUpdate("duration", v)}
        />

        <Toggle
          label="Exclusividade"
          value={inputs.exclusivity}
          onChange={(v) => onUpdate("exclusivity", v)}
        />

        <DialSelector
          label="Porte da Marca"
          value={inputs.brandSize}
          options={["startup", "media", "grande", "multi"] as BrandSize[]}
          labels={BRAND_SIZE_LABELS}
          onChange={(v) => onUpdate("brandSize", v)}
        />

        <SliderInput
          label="Nicho do Produto"
          value={inputs.nicheLevel}
          min={1}
          max={5}
          step={1}
          displayValue={inputs.nicheLevel <= 2 ? "Massa" : inputs.nicheLevel >= 4 ? "Nichado" : "Médio"}
          onChange={(v) => onUpdate("nicheLevel", v as NicheLevel)}
        />

        <DialSelector
          label="Faixa de Investimento"
          value={inputs.budgetRange}
          options={["explorando", "50k", "50-200k", "200k+"] as BudgetRange[]}
          labels={BUDGET_LABELS}
          onChange={(v) => onUpdate("budgetRange", v)}
        />
      </div>

      {/* Output */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6 text-center">
            Análise da Campanha
          </h3>
          <RadarChart data={radarData} />
        </div>

        {/* Conclusion */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                complexityPercent <= 30
                  ? "bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)]"
                  : complexityPercent <= 60
                    ? "bg-[var(--color-accent-yellow)]/20 text-[var(--color-accent-yellow)]"
                    : complexityPercent <= 85
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-red-500/20 text-red-400"
              }`}
            >
              Complexidade {conclusion.level}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">{complexityPercent}%</span>
          </div>
          <p className="text-[var(--color-text)] leading-relaxed mb-6">
            {conclusion.message}
          </p>
          <Button
            variant="primary"
            href={`/contato?campanha=${encodeURIComponent(inputs.description)}&complexidade=${complexityPercent}`}
          >
            Montar essa campanha com a Seek
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Influencer Mode ──

function InfluencerMode({
  inputs,
  output,
  message,
  onUpdate,
}: {
  inputs: InfluencerInputs;
  output: ReturnType<typeof calculateInfluencerOutput>;
  message: ReturnType<typeof getInfluencerMessage>;
  onUpdate: <K extends keyof InfluencerInputs>(key: K, value: InfluencerInputs[K]) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">Sobre seu perfil</h3>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Descreva seu conteúdo
          </label>
          <input
            type="text"
            maxLength={200}
            value={inputs.description}
            onChange={(e) => onUpdate("description", e.target.value)}
            placeholder="Ex: Vídeos de receitas fit e dicas de nutrição"
            className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-cyan)]/50 transition-colors"
          />
          <span className="text-xs text-[var(--color-text-muted)] mt-1 block">{inputs.description.length}/200</span>
        </div>

        <DialSelector
          label="Seguidores Totais"
          value={inputs.followers}
          options={["10k", "50k", "100k", "500k", "1m", "5m+"] as FollowerRange[]}
          labels={FOLLOWER_LABELS}
          onChange={(v) => onUpdate("followers", v)}
        />

        <SliderInput
          label="Taxa de Engajamento"
          value={inputs.engagementRate}
          min={1}
          max={15}
          step={0.5}
          displayValue={`${inputs.engagementRate}%`}
          onChange={(v) => onUpdate("engagementRate", v)}
        />

        <TogglePlatforms
          platforms={inputs.platforms}
          onChange={(p) => onUpdate("platforms", p as InfluencerInputs["platforms"])}
          showTwitter
        />

        <DialSelector
          label="Frequência de Postagem"
          value={inputs.frequency}
          options={["1x", "2-3x", "4-5x", "diario"] as PostFrequency[]}
          labels={FREQUENCY_LABELS}
          onChange={(v) => onUpdate("frequency", v)}
        />

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Nicho Definido?</label>
          <div className="flex flex-wrap gap-2">
            {(["sim", "mais-ou-menos", "nao"] as NicheDefined[]).map((opt) => {
              const nicheLabels: Record<NicheDefined, string> = {
                sim: "Sim",
                "mais-ou-menos": "Mais ou Menos",
                nao: "Não",
              };
              return (
                <button
                  key={opt}
                  onClick={() => onUpdate("nicheDefined", opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    inputs.nicheDefined === opt
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                      : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                  }`}
                >
                  {nicheLabels[opt]}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Experiência com Marcas</label>
          <div className="flex flex-wrap gap-2">
            {(["nunca", "algumas", "frequente"] as BrandExperience[]).map((opt) => {
              const expLabels: Record<BrandExperience, string> = {
                nunca: "Nunca",
                algumas: "Algumas vezes",
                frequente: "Frequente",
              };
              return (
                <button
                  key={opt}
                  onClick={() => onUpdate("brandExperience", opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    inputs.brandExperience === opt
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                      : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                  }`}
                >
                  {expLabels[opt]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6 text-center">
            Seu Score
          </h3>
          <GaugeChart score={output.score} />
        </div>

        {/* Bars */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8 space-y-5">
          <BarIndicator label="Potencial de Monetização" value={output.monetizacao} />
          <BarIndicator label="Versatilidade" value={output.versatilidade} />
          <BarIndicator label="Atratividade para Marcas" value={output.atratividade} />
        </div>

        {/* Message */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                output.score >= 80
                  ? "bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)]"
                  : output.score >= 50
                    ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]"
                    : output.score >= 20
                      ? "bg-[var(--color-accent-yellow)]/20 text-[var(--color-accent-yellow)]"
                      : "bg-[var(--color-text-muted)]/20 text-[var(--color-text-muted)]"
              }`}
            >
              Score: {output.score}
            </span>
          </div>
          <p className="text-[var(--color-text)] leading-relaxed mb-6">
            {message.message}
          </p>
          {inputs.description && (
            <p className="text-sm text-[var(--color-text-muted)] mb-6 italic">
              Com seu foco em &ldquo;{inputs.description}&rdquo;, você tem potencial para
              campanhas que conectam com seu público de forma autêntica.
            </p>
          )}
          <Button variant="primary" href={message.ctaHref}>
            {message.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
