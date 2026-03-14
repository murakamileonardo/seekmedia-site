import { Button } from "@/components/ui/Button";
import { GradientBar } from "@/components/ui/GradientBar";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <GradientBar />
      <div
        className="relative py-24 sm:py-32"
        style={{
          background: `
            linear-gradient(135deg, rgba(0,240,208,0.06) 0%, rgba(128,240,144,0.03) 50%, rgba(208,240,96,0.06) 100%),
            var(--color-surface)
          `,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Pronto para levar sua marca ao{" "}
            <span className="text-gradient">próximo nível</span>?
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-12 text-lg">
            Seja você uma marca buscando influenciadores ou um criador querendo crescer,
            a SeekMedia tem a solução ideal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Marca */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/50 p-8 backdrop-blur-sm hover:border-[var(--color-accent-cyan)]/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-cyan)]/10 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-cyan)" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sou uma Marca</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Encontre os criadores perfeitos para sua campanha
              </p>
              <Button variant="primary" size="md" href="/contato">
                Quero um Orçamento
              </Button>
            </div>

            {/* Influenciador */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/50 p-8 backdrop-blur-sm hover:border-[var(--color-accent-cyan)]/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-green)]/10 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-green)" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sou Influenciador</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Faça parte do casting e conecte-se com grandes marcas
              </p>
              <Button variant="secondary" size="md" href="/contato">
                Quero Fazer Parte
              </Button>
            </div>
          </div>
        </div>
      </div>
      <GradientBar />
    </section>
  );
}
