import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-green)] text-black font-semibold hover:shadow-[0_0_30px_rgba(0,240,208,0.3)] hover:scale-105",
  secondary:
    "border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)]/10 hover:shadow-[0_0_20px_rgba(0,240,208,0.15)]",
  ghost:
    "bg-white/[0.08] text-[var(--color-text)] hover:bg-white/[0.15]",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
