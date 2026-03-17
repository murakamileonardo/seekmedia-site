"use client";

import { useState, useEffect } from "react";
import { CASTING_FILTERS } from "@/lib/constants";
import { BADGE_OPTIONS } from "@/lib/types";
import type { Influencer } from "@/lib/types";

interface InfluencerFormModalProps {
  influencer?: Influencer;
  onSave: (data: Influencer) => void;
  onClose: () => void;
  suggestOrder: (followers: string) => number;
}

const PLATFORM_OPTIONS = CASTING_FILTERS.platforms.filter((p) => p !== "Todas");
const NICHE_OPTIONS = CASTING_FILTERS.niches.filter((n) => n !== "Todos");

const COLOR_PRESETS = ["#00F0D0", "#80F090", "#D0F060", "#E0F050", "#10C0B0", "#10A010"];

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const emptyInfluencer: Influencer = {
  name: "",
  handle: "",
  slug: "",
  niche: "Lifestyle",
  followers: "",
  engagement: "",
  platforms: [],
  bio: "",
  color: "#00F0D0",
  badges: [],
  order: 1,
  socialLinks: {},
  photoUrl: "",
};

export function InfluencerFormModal({ influencer, onSave, onClose, suggestOrder }: InfluencerFormModalProps) {
  const isEdit = !!influencer;
  const [form, setForm] = useState<Influencer>(influencer || { ...emptyInfluencer });
  const [socialLinkKey, setSocialLinkKey] = useState("");
  const [socialLinkUrl, setSocialLinkUrl] = useState("");

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEdit && form.name) {
      setForm((f) => ({ ...f, slug: slugify(f.name) }));
    }
  }, [form.name, isEdit]);

  const updateField = <K extends keyof Influencer>(key: K, value: Influencer[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const togglePlatform = (platform: string) => {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(platform)
        ? f.platforms.filter((p) => p !== platform)
        : [...f.platforms, platform],
    }));
  };

  const toggleBadge = (badge: string) => {
    setForm((f) => ({
      ...f,
      badges: f.badges.includes(badge)
        ? f.badges.filter((b) => b !== badge)
        : [...f.badges, badge],
    }));
  };

  const addSocialLink = () => {
    if (!socialLinkKey || !socialLinkUrl) return;
    setForm((f) => ({
      ...f,
      socialLinks: { ...(f.socialLinks || {}), [socialLinkKey]: socialLinkUrl },
    }));
    setSocialLinkKey("");
    setSocialLinkUrl("");
  };

  const removeSocialLink = (key: string) => {
    setForm((f) => {
      const links = { ...(f.socialLinks || {}) };
      delete links[key];
      return { ...f, socialLinks: links };
    });
  };

  const handleAutoSuggestOrder = () => {
    if (form.followers) {
      const suggested = suggestOrder(form.followers);
      updateField("order", suggested);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.handle || !form.slug) return;
    onSave(form);
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg text-sm bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)]/30 transition-all duration-300";
  const labelClass = "block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">
            {isEdit ? "Editar" : "Adicionar"} <span className="text-gradient">Influenciador</span>
          </h2>
          <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer text-xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row: Name + Handle */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Nome do influenciador"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Handle *</label>
              <input
                type="text"
                value={form.handle}
                onChange={(e) => updateField("handle", e.target.value)}
                placeholder="@usuario"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Row: Slug + Niche */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="auto-gerado"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Nicho</label>
              <select
                value={form.niche}
                onChange={(e) => updateField("niche", e.target.value)}
                className={inputClass}
              >
                {NICHE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row: Followers + Engagement */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Seguidores</label>
              <input
                type="text"
                value={form.followers}
                onChange={(e) => updateField("followers", e.target.value)}
                placeholder="ex: 1.5M"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Engajamento</label>
              <input
                type="text"
                value={form.engagement}
                onChange={(e) => updateField("engagement", e.target.value)}
                placeholder="ex: 4.2%"
                className={inputClass}
              />
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className={labelClass}>Plataformas</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_OPTIONS.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    form.platforms.includes(platform)
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                      : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className={labelClass}>Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              placeholder="Descrição do influenciador..."
              rows={3}
              className={inputClass}
            />
          </div>

          {/* Color */}
          <div>
            <label className={labelClass}>Cor</label>
            <div className="flex gap-2 items-center">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateField("color", c)}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${
                    form.color === c ? "ring-2 ring-white ring-offset-2 ring-offset-[var(--color-surface)] scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input
                type="text"
                value={form.color}
                onChange={(e) => updateField("color", e.target.value)}
                className={`${inputClass} w-24 ml-2`}
                placeholder="#hex"
              />
            </div>
          </div>

          {/* Badges */}
          <div>
            <label className={labelClass}>Badges</label>
            <div className="flex flex-wrap gap-2">
              {BADGE_OPTIONS.map((badge) => (
                <button
                  key={badge}
                  type="button"
                  onClick={() => toggleBadge(badge)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    form.badges.includes(badge)
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                      : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

          {/* Order */}
          <div>
            <label className={labelClass}>Ordem de exibição</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={form.order}
                onChange={(e) => updateField("order", parseInt(e.target.value) || 1)}
                min={1}
                className={`${inputClass} w-24`}
              />
              <button
                type="button"
                onClick={handleAutoSuggestOrder}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/30 cursor-pointer hover:bg-[var(--color-accent-cyan)]/20 transition-colors"
              >
                Auto-sugerir
              </button>
              <span className="text-[10px] text-[var(--color-text-muted)]">
                Baseado em seguidores
              </span>
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className={labelClass}>URL da Foto</label>
            <input
              type="text"
              value={form.photoUrl || ""}
              onChange={(e) => updateField("photoUrl", e.target.value)}
              placeholder="https://... (opcional)"
              className={inputClass}
            />
          </div>

          {/* Social Links */}
          <div>
            <label className={labelClass}>Links das Redes Sociais</label>
            {form.socialLinks && Object.keys(form.socialLinks).length > 0 && (
              <div className="space-y-2 mb-3">
                {Object.entries(form.socialLinks).map(([key, url]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[var(--color-accent-cyan)] w-20 capitalize">{key}</span>
                    <span className="text-xs text-[var(--color-text-muted)] flex-1 truncate">{url}</span>
                    <button
                      type="button"
                      onClick={() => removeSocialLink(key)}
                      className="text-red-400 text-xs hover:text-red-300 cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <select
                value={socialLinkKey}
                onChange={(e) => setSocialLinkKey(e.target.value)}
                className={`${inputClass} w-32`}
              >
                <option value="">Rede...</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
              </select>
              <input
                type="text"
                value={socialLinkUrl}
                onChange={(e) => setSocialLinkUrl(e.target.value)}
                placeholder="https://..."
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={addSocialLink}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] cursor-pointer hover:text-[var(--color-text)] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-[var(--color-border)]">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[var(--color-accent-cyan)] via-[var(--color-accent-green)] to-[var(--color-accent-lime)] text-[#101818] cursor-pointer hover:opacity-90 transition-opacity"
            >
              {isEdit ? "Salvar alterações" : "Adicionar influenciador"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-[var(--color-text-muted)] border border-[var(--color-border)] cursor-pointer hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
