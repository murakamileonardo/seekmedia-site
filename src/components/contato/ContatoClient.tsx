"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

type ContactType = "marca" | "influenciador" | "outro";

interface FormData {
  type: ContactType;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export function ContatoClient() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState<FormData>({
    type: "marca",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill from simulador URL params
  useEffect(() => {
    const tipo = searchParams.get("tipo");
    const campanha = searchParams.get("campanha");
    const complexidade = searchParams.get("complexidade");

    if (tipo === "casting" || tipo === "consultoria" || tipo === "crescimento" || tipo === "dicas") {
      setForm((prev) => ({
        ...prev,
        type: "influenciador",
        message: tipo === "casting"
          ? "Gostaria de me candidatar ao casting da SeekMedia."
          : tipo === "consultoria"
            ? "Tenho interesse em consultoria para crescimento do meu perfil."
            : tipo === "crescimento"
              ? "Quero saber como a Seek pode me ajudar a crescer."
              : "Gostaria de receber dicas para crescer como criador.",
      }));
    } else if (campanha) {
      setForm((prev) => ({
        ...prev,
        type: "marca",
        message: `Campanha: ${campanha}${complexidade ? ` (complexidade: ${complexidade}%)` : ""}. Gostaria de montar essa campanha com a Seek.`,
      }));
    }
  }, [searchParams]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would send to an API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SectionWrapper>
        <div className="max-w-2xl mx-auto text-center pt-8">
          <div className="w-20 h-20 rounded-full bg-[var(--color-accent-cyan)]/10 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-cyan)" strokeWidth={2} className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Mensagem <span className="text-gradient">enviada</span>!
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Recebemos sua mensagem e entraremos em contato em breve.
            Obrigado pelo interesse na SeekMedia!
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Fale com a <span className="text-gradient">Seek</span>
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
            Conte-nos sobre seu projeto ou perfil. Nossa equipe responde em até 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            {/* Type selector */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Como podemos ajudar?
              </label>
              <div className="flex flex-wrap gap-2">
                {([
                  { value: "marca" as const, label: "Sou uma Marca" },
                  { value: "influenciador" as const, label: "Sou Influenciador" },
                  { value: "outro" as const, label: "Outro" },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("type", opt.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                      form.type === opt.value
                        ? "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/50"
                        : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Nome"
                value={form.name}
                onChange={(v) => update("name", v)}
                required
                placeholder="Seu nome completo"
              />
              <InputField
                label="E-mail"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Telefone"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                placeholder="(11) 99999-9999"
              />
              <InputField
                label={form.type === "influenciador" ? "@ principal" : "Empresa"}
                value={form.company}
                onChange={(v) => update("company", v)}
                placeholder={form.type === "influenciador" ? "@seuuser" : "Nome da empresa"}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Mensagem
              </label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={5}
                required
                placeholder={
                  form.type === "marca"
                    ? "Conte sobre sua campanha, produto e objetivos..."
                    : form.type === "influenciador"
                      ? "Fale sobre seu conteúdo, nicho e objetivos..."
                      : "Como podemos ajudar?"
                }
                className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-cyan)]/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full font-semibold px-8 py-3 text-sm bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-green)] text-black hover:shadow-[0_0_30px_rgba(0,240,208,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Enviar Mensagem
            </button>
          </form>

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="text-lg font-semibold mb-4">Informações</h3>
              <div className="space-y-4">
                <InfoItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  }
                  label="E-mail"
                  value="contato@seekmedia.com.br"
                />
                <InfoItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  }
                  label="Telefone"
                  value="+55 (11) 9999-9999"
                />
                <InfoItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
                    </svg>
                  }
                  label="Localização"
                  value="São Paulo, SP — Brasil"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="text-lg font-semibold mb-3">Redes Sociais</h3>
              <div className="flex gap-3">
                {["Instagram", "TikTok", "LinkedIn", "YouTube"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] hover:border-[var(--color-accent-cyan)]/30 transition-all duration-300"
                    title={platform}
                  >
                    <span className="text-xs font-semibold">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-cyan)]/50 transition-colors"
      />
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-cyan)]/10 flex items-center justify-center text-[var(--color-accent-cyan)] shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
        <p className="text-sm text-[var(--color-text)]">{value}</p>
      </div>
    </div>
  );
}
