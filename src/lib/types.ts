// ═══ Influencer Types & Utilities ═══

export interface Influencer {
  name: string;
  handle: string;
  slug: string;
  niche: string;
  followers: string;
  engagement: string;
  platforms: string[];
  bio: string;
  color: string;
  badges: string[];
  order: number;
  socialLinks?: Record<string, string>;
  photoUrl?: string;
}

export const BADGE_OPTIONS = [
  "Em alta",
  "Top of mind",
  "Novo",
  "Exclusivo",
  "Destaque",
] as const;

export type BadgeType = (typeof BADGE_OPTIONS)[number];

export const BADGE_STYLES: Record<BadgeType, { bg: string; text: string }> = {
  "Em alta": { bg: "rgba(0, 240, 208, 0.25)", text: "#00F0D0" },
  "Top of mind": { bg: "rgba(224, 240, 80, 0.25)", text: "#E0F050" },
  "Novo": { bg: "rgba(128, 240, 144, 0.25)", text: "#80F090" },
  "Exclusivo": { bg: "rgba(208, 240, 96, 0.25)", text: "#D0F060" },
  "Destaque": { bg: "rgba(16, 192, 176, 0.25)", text: "#10C0B0" },
};

/** Parse follower string like "155.3M" or "8.9K" to a number */
export function parseFollowerCount(str: string): number {
  const clean = str.replace(/[^0-9.MmKk]/g, "");
  const match = clean.match(/^([\d.]+)([MmKk]?)$/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const suffix = match[2].toUpperCase();
  if (suffix === "M") return num * 1_000_000;
  if (suffix === "K") return num * 1_000;
  return num;
}

/** Suggest order position based on follower count (higher followers = lower order) */
export function suggestOrder(
  followers: string,
  existingInfluencers: Influencer[]
): number {
  const count = parseFollowerCount(followers);
  const sorted = [...existingInfluencers].sort(
    (a, b) => parseFollowerCount(b.followers) - parseFollowerCount(a.followers)
  );
  const idx = sorted.findIndex(
    (inf) => parseFollowerCount(inf.followers) <= count
  );
  return idx === -1 ? sorted.length + 1 : idx + 1;
}
