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
  "Em alta": { bg: "rgba(239, 68, 68, 0.25)", text: "#EF4444" },
  "Top of mind": { bg: "rgba(168, 85, 247, 0.25)", text: "#A855F7" },
  "Novo": { bg: "rgba(239, 68, 68, 0.20)", text: "#F87171" },
  "Exclusivo": { bg: "rgba(168, 85, 247, 0.20)", text: "#C084FC" },
  "Destaque": { bg: "rgba(236, 72, 153, 0.25)", text: "#EC4899" },
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
