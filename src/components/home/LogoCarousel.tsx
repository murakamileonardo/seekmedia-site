import { CLIENT_LOGOS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function LogoCarousel() {
  // Duplicate logos for seamless infinite scroll
  const allLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <SectionWrapper className="py-16">
      <p className="text-center text-sm text-[var(--color-text-muted)] uppercase tracking-widest mb-10 font-medium">
        Marcas que confiam na SeekMedia
      </p>
      <div className="overflow-hidden" role="marquee" aria-label="Logos de clientes">
        <div
          className="flex gap-12 items-center w-max"
          style={{ animation: "scroll-left 30s linear infinite" }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex-shrink-0 w-28 h-12 rounded-lg bg-white/[0.08] flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
              aria-hidden={i >= CLIENT_LOGOS.length}
            >
              <span className="text-xs font-semibold text-[var(--color-text-muted)] select-none">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
