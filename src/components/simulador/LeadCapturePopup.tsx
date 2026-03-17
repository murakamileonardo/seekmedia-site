"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface LeadCapturePopupProps {
  paramsChanged: number;
  conclusionRef: React.RefObject<HTMLDivElement | null>;
  getSimulatorState: () => {
    modo: string;
    params: object;
    conclusao: string;
  };
}

export function LeadCapturePopup({ paramsChanged, conclusionRef, getSimulatorState }: LeadCapturePopupProps) {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const hasShownRef = useRef(false);
  const interactionTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerPopup = useCallback(() => {
    if (hasShownRef.current) return;
    // Check sessionStorage
    if (typeof window !== "undefined" && sessionStorage.getItem("seek_lead_shown") === "1") return;
    hasShownRef.current = true;
    if (typeof window !== "undefined") sessionStorage.setItem("seek_lead_shown", "1");
    setShow(true);
  }, []);

  // Condition 1: 45 seconds of active interaction (tracked by param changes)
  useEffect(() => {
    if (paramsChanged === 0) return;

    // Start timer on first interaction
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        interactionTimeRef.current += 1;
        if (interactionTimeRef.current >= 45) {
          triggerPopup();
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paramsChanged, triggerPopup]);

  // Condition 2: 4+ params adjusted
  useEffect(() => {
    if (paramsChanged >= 4) {
      triggerPopup();
    }
  }, [paramsChanged, triggerPopup]);

  // Condition 3: scroll to conclusion section
  useEffect(() => {
    const el = conclusionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerPopup();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [conclusionRef, triggerPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSending(true);
    setError("");

    try {
      const state = getSimulatorState();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: name.trim(),
          email: email.trim(),
          telefone: phone.trim() || undefined,
          modo: state.modo,
          params: state.params,
          conclusao: state.conclusao,
        }),
      });

      if (!res.ok) throw new Error("Erro ao enviar");
      setSubmitted(true);
    } catch {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !submitted && setShow(false)} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-2xl animate-[fade-in-up_0.4s_ease-out]">
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          /* Success state */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[var(--color-accent-cyan)]/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-accent-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[var(--color-text)] font-semibold mb-2">Pronto!</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Vamos analisar seu cenário e entrar em contato em breve.
            </p>
            <button
              onClick={() => setShow(false)}
              className="mt-6 text-sm text-[var(--color-accent-cyan)] hover:underline cursor-pointer"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
              Olha só, isso é só um simulador!
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
              A nossa experiência vai muito além disso. Deixa a gente te ajudar de forma personalizada — sem compromisso.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nome ou apelido *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-cyan)]/50 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-cyan)]/50 transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Telefone / WhatsApp (opcional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-cyan)]/50 transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-green)] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
              >
                {sending ? "Enviando..." : "Quero uma análise personalizada"}
              </button>
            </form>

            <button
              onClick={() => setShow(false)}
              className="w-full mt-3 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer text-center py-2"
            >
              Agora não, quero continuar simulando
            </button>
          </>
        )}
      </div>
    </div>
  );
}
