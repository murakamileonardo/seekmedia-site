"use client";

import { useState, useEffect, useRef } from "react";
import { CASTING_FILTERS } from "@/lib/constants";
import { BADGE_OPTIONS, BADGE_STYLES, isValidFollowerFormat, derivePlatforms } from "@/lib/types";
import type { Influencer, BadgeType } from "@/lib/types";

interface InfluencerFormModalProps {
  influencer?: Influencer;
  onSave: (data: Influencer) => void;
  onClose: () => void;
  suggestOrder: (followers: string) => number;
}

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
  niches: [],
  followers: "",
  engagement: "",
  platforms: [],
  bio: "",
  color: "#00F0D0",
  badges: [],
  order: 1,
  socialLinks: {},
  photoUrl: "",
  active: true,
};

export function InfluencerFormModal({ influencer, onSave, onClose, suggestOrder }: InfluencerFormModalProps) {
  const isEdit = !!influencer;
  const [form, setForm] = useState<Influencer>(influencer || { ...emptyInfluencer });
  const [socialLinkKey, setSocialLinkKey] = useState("");
  const [socialLinkUrl, setSocialLinkUrl] = useState("");
  const [photoMode, setPhotoMode] = useState<"upload" | "url">(
    form.photoUrl && !form.photoUrl.startsWith("data:") ? "url" : "upload"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEdit && form.name) {
      setForm((f) => ({ ...f, slug: slugify(f.name) }));
    }
  }, [form.name, isEdit]);

  // Auto-derive platforms from social links
  useEffect(() => {
    const platforms = derivePlatforms(form.socialLinks);
    setForm((f) => ({ ...f, platforms }));
  }, [form.socialLinks]);

  const updateField = <K extends keyof Influencer>(key: K, value: Influencer[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    // Clear error on change
    if (errors[key as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    }
  };

  const toggleNiche = (niche: string) => {
    setForm((f) => ({
      ...f,
      niches: f.niches.includes(niche)
        ? f.niches.filter((n) => n !== niche)
        : [...f.niches, niche],
    }));
    if (errors.niches) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.niches;
        return next;
      });
    }
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
    if (errors.socialLinks) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.socialLinks;
        return next;
      });
    }
  };

  const removeSocialLink = (key: string) => {
    setForm((f) => {
      const links = { ...(f.socialLinks || {}) };
      delete links[key];
      return { ...f, socialLinks: links };
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      updateField("photoUrl", result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    updateField("photoUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAutoSuggestOrder = () => {
    if (form.followers && isValidFollowerFormat(form.followers)) {
      const suggested = suggestOrder(form.followers);
      updateField("order", suggested);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Obrigatório";
    if (!form.handle.trim()) errs.handle = "Obrigatório";
    if (!form.slug.trim()) errs.slug = "Obrigatório";
    if (form.niches.length === 0) errs.niches = "Selecione pelo menos um nicho";
    if (!form.followers.trim()) {
      errs.followers = "Obrigatório";
    } else if (!isValidFollowerFormat(form.followers)) {
      errs.followers = "Use formato: 1.5M ou 500K";
    }
    if (!form.engagement.trim()) errs.engagement = "Obrigatório";
    if (!form.bio.trim()) errs.bio = "Obrigatório";
    if (!form.photoUrl) errs.photoUrl = "Foto obrigatória";
    if (!form.socialLinks || Object.keys(form.socialLinks).length === 0) {
      errs.socialLinks = "Adicione pelo menos um link";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg text-sm bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)]/30 transition-all duration-300";
  const inputErrorClass =
    "w-full px-3 py-2 rounded-lg text-sm bg-[var(--color-surface-elevated)] border border-red-500/50 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/30 transition-all duration-300";
  const labelClass = "block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6"
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
                className={errors.name ? inputErrorClass : inputClass}
              />
              {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className={labelClass}>Handle *</label>
              <input
                type="text"
                value={form.handle}
                onChange={(e) => updateField("handle", e.target.value)}
                placeholder="@usuario"
                className={errors.handle ? inputErrorClass : inputClass}
              />
              {errors.handle && <p className="text-[10px] text-red-400 mt-1">{errors.handle}</p>}
            </div>
          </div>

          {/* Row: Slug */}
          <div>
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="auto-gerado"
              className={errors.slug ? inputErrorClass : inputClass}
            />
          </div>

          {/* Niches — multi-select */}
          <div>
            <label className={labelClass}>Nichos *</label>
            <div className="flex flex-wrap gap-2">
              {NICHE_OPTIONS.map((niche) => (
                <button
                  key={niche}
                  type="button"
                  onClick={() => toggleNiche(niche)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    form.niches.includes(niche)
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                      : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>
            {errors.niches && <p className="text-[10px] text-red-400 mt-1">{errors.niches}</p>}
          </div>

          {/* Row: Followers + Engagement */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Seguidores *</label>
              <input
                type="text"
                value={form.followers}
                onChange={(e) => updateField("followers", e.target.value)}
                placeholder="ex: 1.5M ou 500K"
                className={errors.followers ? inputErrorClass : inputClass}
              />
              {errors.followers && <p className="text-[10px] text-red-400 mt-1">{errors.followers}</p>}
            </div>
            <div>
              <label className={labelClass}>Engajamento *</label>
              <input
                type="text"
                value={form.engagement}
                onChange={(e) => updateField("engagement", e.target.value)}
                placeholder="ex: 4.2%"
                className={errors.engagement ? inputErrorClass : inputClass}
              />
              {errors.engagement && <p className="text-[10px] text-red-400 mt-1">{errors.engagement}</p>}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className={labelClass}>Bio *</label>
            <textarea
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              placeholder="Descrição do influenciador..."
              rows={3}
              className={errors.bio ? inputErrorClass : inputClass}
            />
            {errors.bio && <p className="text-[10px] text-red-400 mt-1">{errors.bio}</p>}
          </div>

          {/* Color */}
          <div>
            <label className={labelClass}>Cor *</label>
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

          {/* Badges — with real colors */}
          <div>
            <label className={labelClass}>Badges <span className="normal-case tracking-normal font-normal">(opcional)</span></label>
            <div className="flex flex-wrap gap-2">
              {BADGE_OPTIONS.map((badge) => {
                const badgeStyle = BADGE_STYLES[badge as BadgeType];
                const isSelected = form.badges.includes(badge);
                return (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => toggleBadge(badge)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer border ${
                      isSelected ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                    style={{
                      backgroundColor: isSelected ? badgeStyle.bg : undefined,
                      color: isSelected ? badgeStyle.text : "var(--color-text-muted)",
                      borderColor: isSelected ? `${badgeStyle.text}50` : "var(--color-border)",
                    }}
                  >
                    {badge}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order */}
          <div>
            <label className={labelClass}>Ordem de exibição *</label>
            <div className="flex gap-2 items-center w-fit">
              <input
                type="number"
                value={form.order}
                onChange={(e) => updateField("order", parseInt(e.target.value) || 1)}
                min={1}
                className={`${inputClass} w-16 text-center`}
              />
              <button
                type="button"
                onClick={handleAutoSuggestOrder}
                className="px-2.5 py-2 rounded-lg text-[11px] font-medium bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/30 cursor-pointer hover:bg-[var(--color-accent-cyan)]/20 transition-colors whitespace-nowrap"
              >
                Auto-sugerir
              </button>
              <span className="text-[10px] text-[var(--color-text-muted)] whitespace-nowrap">
                Baseado em seguidores
              </span>
            </div>
          </div>

          {/* Photo */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={`${labelClass} mb-0`}>Foto *</label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setPhotoMode("upload")}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors ${
                    photoMode === "upload"
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoMode("url")}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors ${
                    photoMode === "url"
                      ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  URL
                </button>
              </div>
            </div>

            {photoMode === "upload" ? (
              <div className="flex items-start gap-4">
                <div className={`w-20 h-20 rounded-xl border ${errors.photoUrl ? "border-red-500/50" : "border-[var(--color-border)]"} bg-[var(--color-surface-elevated)] overflow-hidden shrink-0 flex items-center justify-center`}>
                  {form.photoUrl ? (
                    <img src={form.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-[var(--color-text-muted)]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full py-2 rounded-lg text-xs font-medium border border-dashed ${errors.photoUrl ? "border-red-500/50 text-red-400" : "border-[var(--color-border)] text-[var(--color-text-muted)]"} hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)] cursor-pointer transition-colors`}
                  >
                    {form.photoUrl ? "Trocar imagem" : "Selecionar imagem"}
                  </button>
                  {form.photoUrl && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-[10px] text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                    >
                      Remover foto
                    </button>
                  )}
                  <p className="text-[10px] text-[var(--color-text-muted)]">
                    JPG, PNG ou WebP — máx 5MB
                  </p>
                  {errors.photoUrl && <p className="text-[10px] text-red-400">{errors.photoUrl}</p>}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                {form.photoUrl && (
                  <div className="w-20 h-20 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden shrink-0">
                    <img src={form.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={form.photoUrl?.startsWith("data:") ? "" : form.photoUrl || ""}
                    onChange={(e) => updateField("photoUrl", e.target.value)}
                    placeholder="https://..."
                    className={errors.photoUrl ? inputErrorClass : inputClass}
                  />
                  {errors.photoUrl && <p className="text-[10px] text-red-400 mt-1">{errors.photoUrl}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="overflow-hidden">
            <label className={labelClass}>Links das Redes Sociais *</label>
            {form.socialLinks && Object.keys(form.socialLinks).length > 0 && (
              <div className="space-y-1.5 mb-3">
                {Object.entries(form.socialLinks).map(([key, url]) => (
                  <div key={key} className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-medium text-[var(--color-accent-cyan)] w-16 shrink-0 capitalize">{key}</span>
                    <span className="text-xs text-[var(--color-text-muted)] flex-1 truncate min-w-0">{url}</span>
                    <button
                      type="button"
                      onClick={() => removeSocialLink(key)}
                      className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-400/10 cursor-pointer transition-colors shrink-0"
                      title="Remover"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-1.5">
              <select
                value={socialLinkKey}
                onChange={(e) => setSocialLinkKey(e.target.value)}
                className={`${errors.socialLinks && (!form.socialLinks || Object.keys(form.socialLinks).length === 0) ? inputErrorClass : inputClass} !w-24 shrink-0`}
              >
                <option value="">Rede...</option>
                <option value="instagram">IG</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YT</option>
                <option value="twitter">X</option>
                <option value="linkedin">LinkedIn</option>
              </select>
              <input
                type="text"
                value={socialLinkUrl}
                onChange={(e) => setSocialLinkUrl(e.target.value)}
                placeholder="https://..."
                className={`${inputClass} flex-1 min-w-0`}
              />
              <button
                type="button"
                onClick={addSocialLink}
                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg text-sm font-medium bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] cursor-pointer hover:text-[var(--color-text)] transition-colors"
              >
                +
              </button>
            </div>
            {errors.socialLinks && (!form.socialLinks || Object.keys(form.socialLinks).length === 0) && (
              <p className="text-[10px] text-red-400 mt-1">{errors.socialLinks}</p>
            )}
            <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5">
              As plataformas são detectadas automaticamente pelos links adicionados
            </p>
          </div>

          {/* Detected Platforms (read-only) */}
          {form.platforms.length > 0 && (
            <div>
              <label className={labelClass}>Plataformas detectadas</label>
              <div className="flex flex-wrap gap-1.5">
                {form.platforms.map((p) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/30"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status toggle */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">Status do influenciador</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">
                {form.active !== false ? "Visível no casting e no site" : "Oculto do casting e do site"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => updateField("active", form.active === false ? true : false)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                form.active !== false
                  ? "bg-[var(--color-accent-green)]"
                  : "bg-[var(--color-text-muted)]/30"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  form.active !== false ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
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
