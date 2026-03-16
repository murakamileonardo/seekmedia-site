"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Button } from "@/components/ui/Button";
import { CLIENT_LOGOS } from "@/lib/constants";

interface HeroScrollVideoProps {
  videoSrc?: string;
}

export function HeroScrollVideo({ videoSrc }: HeroScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useScrollProgress(containerRef);

  // Sync video playback to scroll progress
  if (videoRef.current && videoRef.current.duration) {
    videoRef.current.currentTime = progress * videoRef.current.duration;
  }

  // Text fades out as user scrolls (visible 0-0.3, fades 0.3-0.5)
  const textOpacity = progress < 0.3 ? 1 : progress > 0.5 ? 0 : 1 - (progress - 0.3) / 0.2;
  const textTranslateY = progress < 0.3 ? 0 : (progress - 0.3) * 150;

  // Scroll indicator fades out quickly
  const scrollIndicatorOpacity = progress < 0.05 ? 1 : progress > 0.15 ? 0 : 1 - (progress - 0.05) / 0.1;

  // Logo carousel — duplicate for seamless loop
  const allLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Video or Placeholder Background */}
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--color-bg)]">
            {/* Animated gradient placeholder */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,240,208,0.08) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 40% at 30% 60%, rgba(128,240,144,0.05) 0%, transparent 60%),
                  radial-gradient(ellipse 50% 50% at 70% 40%, rgba(16,192,176,0.06) 0%, transparent 60%)
                `,
              }}
            />
          </div>
        )}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text Content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center pb-28"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            transition: "opacity 0.1s ease-out",
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold max-w-5xl leading-tight mb-6">
            Conectamos marcas aos{" "}
            <span className="text-gradient">maiores criadores</span>{" "}
            do Brasil
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mb-10 leading-relaxed">
            Somos uma agência criada por influenciadores, para influenciadores.
            Estratégia, criatividade e resultados que transformam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" href="/casting">
              Conheça Nosso Casting
            </Button>
            <Button variant="secondary" size="lg" href="/contato">
              Quero um Orçamento
            </Button>
          </div>
        </div>

        {/* Client Logo Carousel — above scroll indicator */}
        <div className="absolute bottom-16 left-0 right-0 z-10">
          <p className="text-center text-[10px] sm:text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-4 font-medium">
            Marcas que confiam na SeekMedia
          </p>
          <div className="overflow-hidden" role="marquee" aria-label="Logos de clientes">
            <div
              className="flex gap-10 items-center w-max"
              style={{ animation: "scroll-left 30s linear infinite" }}
            >
              {allLogos.map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex-shrink-0 w-24 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
                  aria-hidden={i >= CLIENT_LOGOS.length}
                >
                  <span className="text-[10px] font-semibold text-[var(--color-text-muted)] select-none">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator — pinned at very bottom */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-4 h-6 rounded-full border-2 border-[var(--color-text-muted)]/50 flex justify-center pt-1">
            <div className="w-0.5 h-1.5 bg-[var(--color-accent-cyan)] rounded-full animate-bounce" />
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
