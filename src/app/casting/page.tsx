import { Metadata } from "next";
import { GradientBar } from "@/components/ui/GradientBar";
import { CastingClient } from "@/components/casting/CastingClient";

export const metadata: Metadata = {
  title: "Casting — SeekMedia",
  description: "Conheça os influenciadores do casting da SeekMedia. Filtros por nicho, plataforma e tamanho.",
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
