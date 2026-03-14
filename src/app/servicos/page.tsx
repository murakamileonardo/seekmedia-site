import { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBar } from "@/components/ui/GradientBar";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Serviços — SeekMedia",
  description: "Conheça os serviços da SeekMedia: gestão de influenciadores, produção audiovisual e estratégia de campanhas.",
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  strategy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>
  ),
};

export default function ServicosPage() {
  return (
    <>
      <GradientBar />
      <SectionWrapper>
        <div className="text-center mb-16 pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="text-gradient">Serviços</span>
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">
            Soluções completas para conectar sua marca ao público certo, do planejamento à execução
          </p>
        </div>

        <div className="space-y-12">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Icon card */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 flex items-center justify-center aspect-video">
                  <div className="text-[var(--color-accent-cyan)]">
                    {SERVICE_ICONS[service.icon] || null}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-cyan)]/10 flex items-center justify-center text-[var(--color-accent-cyan)] mb-6">
                  {SERVICE_ICONS[service.icon] || null}
                </div>
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                  {service.longDescription}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
                        <path d="m4.5 12.75 6 6 9-13.5" stroke="var(--color-accent-cyan)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-[var(--color-text)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <GradientBar />

      {/* CTA */}
      <SectionWrapper className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Pronto para <span className="text-gradient">começar</span>?
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-8">
          Entre em contato e receba uma proposta personalizada para sua marca.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg" href="/contato">
            Solicitar Orçamento
          </Button>
          <Button variant="secondary" size="lg" href="/simulador">
            Simular Campanha
          </Button>
        </div>
      </SectionWrapper>

      <GradientBar />
    </>
  );
}
