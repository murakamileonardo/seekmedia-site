import { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBar } from "@/components/ui/GradientBar";
import { SimuladorClient } from "@/components/simulador/SimuladorClient";

export const metadata: Metadata = {
  title: "Simulador de Campanhas — SeekMedia",
  description:
    "Simule sua campanha de influência ou descubra seu potencial como criador de conteúdo. Ferramenta interativa da SeekMedia.",
};

export default function SimuladorPage() {
  return (
    <>
      <GradientBar />
      <SectionWrapper>
        <div className="text-center mb-12 pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simulador de <span className="text-gradient">Campanhas</span>
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">
            Descubra o potencial da sua campanha ou do seu perfil como criador.
            Ajuste os parâmetros e veja os resultados em tempo real.
          </p>
        </div>
        <SimuladorClient />
      </SectionWrapper>
      <GradientBar />
    </>
  );
}
