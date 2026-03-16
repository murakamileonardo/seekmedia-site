import { Suspense } from "react";
import { Metadata } from "next";
import { GradientBar } from "@/components/ui/GradientBar";
import { ContatoClient } from "@/components/contato/ContatoClient";

export const metadata: Metadata = {
  title: "Contato — SeekMedia",
  description:
    "Entre em contato com a SeekMedia. Solicite um orçamento para sua campanha de influência ou candidate-se ao nosso casting.",
};

export default function ContatoPage() {
  return (
    <>
      <GradientBar />
      <Suspense>
        <ContatoClient />
      </Suspense>
      <GradientBar />
    </>
  );
}
