import { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBar } from "@/components/ui/GradientBar";
import { Button } from "@/components/ui/Button";
import { TEAM_MEMBERS, VALUES, COUNTERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre — SeekMedia",
  description: "Conheça a SeekMedia: agência de influenciadores e produção audiovisual que conecta marcas aos maiores criadores do Brasil.",
};

export default function SobrePage() {
  return (
    <>
      <GradientBar />

      {/* Hero */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto text-center pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Conectamos marcas aos maiores{" "}
            <span className="text-gradient">criadores do Brasil</span>
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
            A SeekMedia nasceu da convicção de que o marketing de influência precisa
            de mais estratégia, mais dados e mais autenticidade. Somos a ponte entre
            marcas que buscam resultados reais e criadores que querem crescer de forma
            sustentável.
          </p>
        </div>
      </SectionWrapper>

      <GradientBar />

      {/* Numbers */}
      <SectionWrapper>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COUNTERS.map((counter) => (
            <div key={counter.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-gradient mb-2">
                {counter.decimals ? counter.value.toFixed(counter.decimals) : counter.value}
                {counter.suffix}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">{counter.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <GradientBar />

      {/* Values */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nossos <span className="text-gradient">Valores</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-teal)]/50 transition-all duration-500"
            >
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{value.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <GradientBar />

      {/* Team */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nosso <span className="text-gradient">Time</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
            Profissionais apaixonados por conectar marcas e criadores
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center hover:border-[var(--color-teal)]/50 transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--color-surface-elevated)] mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-[var(--color-accent-cyan)]">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-semibold text-[var(--color-text)] mb-1">{member.name}</h3>
              <p className="text-xs text-[var(--color-accent-cyan)] font-medium mb-2">{member.role}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{member.bio}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <GradientBar />

      {/* CTA */}
      <SectionWrapper className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Vamos trabalhar <span className="text-gradient">juntos</span>?
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-8">
          Entre em contato e descubra como podemos transformar sua estratégia de influência.
        </p>
        <Button variant="primary" size="lg" href="/contato">
          Fale Conosco
        </Button>
      </SectionWrapper>

      <GradientBar />
    </>
  );
}
