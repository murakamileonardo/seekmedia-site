"use client";

import { Button } from "@/components/ui/Button";
import { CLIENT_LOGOS } from "@/lib/constants";

const allLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,240,208,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 30% 60%, rgba(128,240,144,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 70% 40%, rgba(16,192,176,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center px-4 text-center pt-32 pb-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold max-w-5xl leading-tight mb-6">
          Conectamos marcas aos{" "}
          <span className="text-gradient">maiores criadores</span>{" "}
          do Brasil
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mb-10 leading-relaxed">
          Somos uma agência criada por influencers, para influencers.
          Estratégia, criatividade e resultados que transformam.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg" href="/casting">
            Conheça Nossos Influencers
          </Button>
          <Button variant="secondary" size="lg" href="/contato">
            Quero um Orçamento
          </Button>
        </div>
      </div>

      {/* Client Logo Carousel */}
      <div className="pb-16">
        <p className="text-center text-[10px] sm:text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-4 font-medium">
          Marcas que confiam na Seekmedia
        </p>
        <div className="overflow-hidden" role="marquee" aria-label="Logos de clientes">
          <div
            className="flex gap-8 items-center w-max"
            style={{ animation: `scroll-left ${CLIENT_LOGOS.length * 2.5}s linear infinite` }}
          >
            {allLogos.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 h-10 px-2 flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-500 cursor-default"
                aria-hidden={i >= CLIENT_LOGOS.length}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto object-contain brightness-0 invert"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />
    </div>
  );
}
