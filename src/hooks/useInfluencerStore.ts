"use client";

import { useState, useEffect, useCallback } from "react";
import type { Influencer } from "@/lib/types";
import { parseFollowerCount, suggestOrder } from "@/lib/types";
import { ALL_INFLUENCERS } from "@/lib/constants";

const STORAGE_KEY = "seek_influencers_data";

type StoredInfluencer = Influencer & { _deleted?: boolean };

function loadFromStorage(): Record<string, StoredInfluencer> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, StoredInfluencer>;
  } catch {
    return {};
  }
}

function saveToStorage(data: Record<string, StoredInfluencer>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function mergeInfluencers(overrides: Record<string, StoredInfluencer>): Influencer[] {
  // Start with base data
  const bySlug = new Map<string, Influencer>();

  for (const inf of ALL_INFLUENCERS) {
    bySlug.set(inf.slug, { ...inf });
  }

  // Apply overrides (edit existing or add new)
  for (const [slug, data] of Object.entries(overrides)) {
    if (data._deleted) continue; // skip deleted
    if (bySlug.has(slug)) {
      // Merge over existing
      bySlug.set(slug, { ...bySlug.get(slug)!, ...data });
    } else {
      // New influencer added via admin
      bySlug.set(slug, data);
    }
  }

  // Sort by order
  return Array.from(bySlug.values()).sort((a, b) => a.order - b.order);
}

export function useInfluencerStore() {
  const [overrides, setOverrides] = useState<Record<string, StoredInfluencer>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOverrides(loadFromStorage());
    setLoaded(true);
  }, []);

  const influencers = loaded ? mergeInfluencers(overrides) : ALL_INFLUENCERS;

  const persist = useCallback((next: Record<string, StoredInfluencer>) => {
    setOverrides(next);
    saveToStorage(next);
  }, []);

  const addInfluencer = useCallback(
    (inf: Influencer) => {
      const next = { ...overrides, [inf.slug]: inf };
      persist(next);
    },
    [overrides, persist]
  );

  const updateInfluencer = useCallback(
    (slug: string, partial: Partial<Influencer>) => {
      const existing =
        overrides[slug] || ALL_INFLUENCERS.find((i) => i.slug === slug);
      if (!existing) return;
      const updated = { ...existing, ...partial } as Influencer;
      const next = { ...overrides, [slug]: updated };

      // If slug changed, remove old key
      const finalSlug = partial.slug && partial.slug !== slug ? partial.slug : slug;
      if (partial.slug && partial.slug !== slug) {
        delete next[slug];
        next[partial.slug] = updated;
      }

      // Reorder logic: if order changed, shift others at that position and below
      if (partial.order !== undefined) {
        const targetOrder = partial.order;
        const currentInfluencers = mergeInfluencers(overrides);

        for (const inf of currentInfluencers) {
          if (inf.slug === finalSlug) continue; // skip the one being updated
          if (inf.order >= targetOrder) {
            const infExisting = next[inf.slug] || ALL_INFLUENCERS.find((i) => i.slug === inf.slug);
            next[inf.slug] = { ...(infExisting || inf), order: inf.order + 1 } as Influencer;
          }
        }
      }

      persist(next);
    },
    [overrides, persist]
  );

  const deleteInfluencer = useCallback(
    (slug: string) => {
      const existing = overrides[slug] || ALL_INFLUENCERS.find((i) => i.slug === slug) || {};
      const next: Record<string, StoredInfluencer> = {
        ...overrides,
        [slug]: { ...existing, _deleted: true } as StoredInfluencer,
      };
      persist(next);
    },
    [overrides, persist]
  );

  const getSuggestedOrder = useCallback(
    (followers: string) => {
      return suggestOrder(followers, influencers);
    },
    [influencers]
  );

  return {
    influencers,
    loaded,
    addInfluencer,
    updateInfluencer,
    deleteInfluencer,
    getSuggestedOrder,
  };
}
