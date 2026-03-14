"use client";

import { useState } from "react";
import { GradientBar } from "@/components/ui/GradientBar";

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Small delay to prevent brute force
    setTimeout(() => {
      const success = onLogin(password);
      if (!success) {
        setError(true);
        setPassword("");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <GradientBar />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-cyan)]/10 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-cyan)" strokeWidth={1.5} className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold mb-1">Área Restrita</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Acesso exclusivo para a equipe SeekMedia
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Senha de acesso
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Digite a senha"
                  autoFocus
                  required
                  className={`w-full bg-[var(--color-surface-elevated)] border rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none transition-colors ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-accent-cyan)]/50"
                  }`}
                />
                {error && (
                  <p className="text-xs text-red-400 mt-2">Senha incorreta. Tente novamente.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-full font-semibold px-6 py-3 text-sm bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-green)] text-black hover:shadow-[0_0_30px_rgba(0,240,208,0.3)] transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
