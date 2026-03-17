"use client";

import { useState } from "react";
import { GradientBar } from "@/components/ui/GradientBar";
import { ALL_CASES } from "@/lib/constants";
import { useInfluencerStore } from "@/hooks/useInfluencerStore";
import { InfluencerFormModal } from "./InfluencerFormModal";
import type { Influencer } from "@/lib/types";

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = "overview" | "influencers" | "deals";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <>
      <GradientBar />
      <div className="min-h-screen pt-20">
        {/* Admin header */}
        <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold">
                Painel <span className="text-gradient">Admin</span>
              </h1>
              <div className="flex gap-1">
                {(
                  [
                    { key: "overview" as const, label: "Visão Geral" },
                    { key: "influencers" as const, label: "Casting" },
                    { key: "deals" as const, label: "Deals" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                      tab === t.key
                        ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="text-xs text-[var(--color-text-muted)] hover:text-red-400 transition-colors cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {tab === "overview" && <OverviewTab />}
          {tab === "influencers" && <InfluencersTab />}
          {tab === "deals" && <DealsTab />}
        </div>
      </div>
    </>
  );
}

// ── Overview Tab ──
function OverviewTab() {
  const { influencers } = useInfluencerStore();

  const stats = [
    { label: "Influenciadores no Casting", value: influencers.length, color: "#00F0D0" },
    { label: "Cases Registrados", value: ALL_CASES.length, color: "#80F090" },
    { label: "Deals Ativos", value: 5, color: "#D0F060" },
    { label: "Propostas Pendentes", value: 3, color: "#E0F050" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <p className="text-3xl font-extrabold mb-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="text-sm font-semibold mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          {[
            { action: "Novo lead via Simulador", detail: "Modo Marca — App de delivery", time: "2 min atrás", color: "#00F0D0" },
            { action: "Proposta enviada", detail: "Nike — Campanha de verão", time: "1h atrás", color: "#80F090" },
            { action: "Deal aprovado", detail: "Natura — Linha sustentável", time: "3h atrás", color: "#D0F060" },
            { action: "Novo influenciador no casting", detail: "Lucas Rangel — Humor", time: "5h atrás", color: "#E0F050" },
            { action: "Formulário de contato", detail: "Influenciador — @creatorexample", time: "8h atrás", color: "#00F0D0" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-[var(--color-border)] last:border-0">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-text)]">{item.action}</p>
                <p className="text-xs text-[var(--color-text-muted)] truncate">{item.detail}</p>
              </div>
              <span className="text-xs text-[var(--color-text-muted)] shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Influencers Tab ──
function InfluencersTab() {
  const { influencers, addInfluencer, updateInfluencer, deleteInfluencer, getSuggestedOrder } =
    useInfluencerStore();
  const [showModal, setShowModal] = useState(false);
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | undefined>();

  const handleAdd = () => {
    setEditingInfluencer(undefined);
    setShowModal(true);
  };

  const handleEdit = (inf: Influencer) => {
    setEditingInfluencer(inf);
    setShowModal(true);
  };

  const handleDelete = (slug: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${name}" do casting?`)) {
      deleteInfluencer(slug);
    }
  };

  const handleSave = (data: Influencer) => {
    if (editingInfluencer) {
      updateInfluencer(editingInfluencer.slug, data);
    } else {
      addInfluencer(data);
    }
    setShowModal(false);
    setEditingInfluencer(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Gestão do Casting</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-full text-xs font-medium bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50 cursor-pointer hover:bg-[var(--color-accent-cyan)]/30 transition-colors"
        >
          + Adicionar Influenciador
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider w-10">
                  #
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Nome
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Nicho
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Seguidores
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Engajamento
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Plataformas
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Badges
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {influencers.map((inf) => (
                <tr
                  key={inf.slug}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-elevated)]/50 transition-colors"
                >
                  <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                    {inf.order}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-[var(--color-text)]">{inf.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{inf.handle}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor: `${inf.color}40`,
                        color: inf.color,
                        backgroundColor: `${inf.color}10`,
                      }}
                    >
                      {inf.niche}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[var(--color-text)]">{inf.followers}</td>
                  <td className="py-3 px-4 text-[var(--color-accent-cyan)]">{inf.engagement}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {inf.platforms.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] px-1.5 py-0.5 rounded"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {inf.badges && inf.badges.length > 0 ? (
                        inf.badges.map((b) => (
                          <span
                            key={b}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]"
                          >
                            {b}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-[var(--color-text-muted)]">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)]">
                      Ativo
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(inf)}
                        className="text-xs text-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]/80 cursor-pointer transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(inf.slug, inf.name)}
                        className="text-xs text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <InfluencerFormModal
          influencer={editingInfluencer}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingInfluencer(undefined);
          }}
          suggestOrder={getSuggestedOrder}
        />
      )}
    </div>
  );
}

// ── Deals Tab ──
function DealsTab() {
  const deals = [
    {
      id: 1,
      client: "Nike",
      campaign: "Campanha de Verão 2026",
      influencers: ["Ronaldinho Gaúcho", "Casimiro Miguel"],
      budget: "R$ 250.000",
      margin: "35%",
      status: "approved" as const,
    },
    {
      id: 2,
      client: "Natura",
      campaign: "Linha Sustentável",
      influencers: ["Juliette Freire", "Camila Coelho"],
      budget: "R$ 180.000",
      margin: "38%",
      status: "review" as const,
    },
    {
      id: 3,
      client: "iFood",
      campaign: "Live Commerce Q2",
      influencers: ["Casimiro Miguel"],
      budget: "R$ 95.000",
      margin: "42%",
      status: "draft" as const,
    },
    {
      id: 4,
      client: "Samsung",
      campaign: "Lançamento Galaxy S26",
      influencers: ["Felipe Neto", "Anitta", "Jade Picon"],
      budget: "R$ 500.000",
      margin: "30%",
      status: "approved" as const,
    },
    {
      id: 5,
      client: "Ambev",
      campaign: "Festival de Verão",
      influencers: ["Gkay", "Lucas Rangel", "Whindersson Nunes"],
      budget: "R$ 320.000",
      margin: "33%",
      status: "review" as const,
    },
  ];

  const statusConfig = {
    approved: { label: "Aprovado", className: "bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)]" },
    review: { label: "Em Revisão", className: "bg-[var(--color-accent-yellow)]/20 text-[var(--color-accent-yellow)]" },
    draft: { label: "Rascunho", className: "bg-[var(--color-text-muted)]/20 text-[var(--color-text-muted)]" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Deal Review</h2>
        <button className="px-4 py-2 rounded-full text-xs font-medium bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50 cursor-pointer hover:bg-[var(--color-accent-cyan)]/30 transition-colors">
          + Novo Deal
        </button>
      </div>

      <div className="space-y-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-teal)]/30 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-[var(--color-text)]">{deal.client}</h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusConfig[deal.status].className}`}
                  >
                    {statusConfig[deal.status].label}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">{deal.campaign}</p>
                <div className="flex flex-wrap gap-1">
                  {deal.influencers.map((inf) => (
                    <span
                      key={inf}
                      className="text-[10px] text-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/10 px-2 py-0.5 rounded-full"
                    >
                      {inf}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <p className="text-sm font-semibold text-[var(--color-text)]">{deal.budget}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Budget</p>
                </div>
                <div className="text-right">
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        parseFloat(deal.margin) >= 35
                          ? "#80F090"
                          : parseFloat(deal.margin) >= 25
                            ? "#E0F050"
                            : "#ff6b6b",
                    }}
                  >
                    {deal.margin}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">Margem</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
