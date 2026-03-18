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
          className="flex gap-10 items-center w-max"
          style={{ animation: `scroll-left ${CLIENT_LOGOS.length * 2.5}s linear infinite` }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 h-12 flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-500 cursor-default"
              aria-hidden={i >= CLIENT_LOGOS.length}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-full w-auto object-contain brightness-0 invert"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
