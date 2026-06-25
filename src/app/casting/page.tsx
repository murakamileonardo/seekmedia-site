import { Metadata } from "next";
import { GradientBar } from "@/components/ui/GradientBar";
import { CastingClient } from "@/components/casting/CastingClient";

export const metadata: Metadata = {
  title: "Squad - Seekmedia",
  description: "Conheça os influenciadores do squad da Seekmedia. Filtros por nicho, plataforma e tamanho.",
};

export default function CastingPage() {
  return (
    <>
      <GradientBar />
      <CastingClient />
      <GradientBar />
    </>
  );
}
