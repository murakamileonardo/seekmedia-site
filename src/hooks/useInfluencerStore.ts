"use client";

import { useState, useEffect, useCallback } from "react";
import type { Influencer } from "@/lib/types";
import { parseFollowerCount, suggestOrder } from "@/lib/types";
import { ALL_INFLUENCERS } from "@/lib/constants";

const STORAGE_KEY = "seek_influencers_data";
const STORAGE_VERSION_KEY = "seek_influencers_version";
const STORAGE_VERSION = "2"; // Bump when influencer schema changes

type StoredInfluencer = Influencer & { _deleted?: boolean };

function loadFromStorage(): Record<string, StoredInfluencer> {
  if (typeof window === "undefined") return {};
  try {
    // Clear stale data from previous versions to avoid field-mismatch crashes
    const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    if (storedVersion !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
      return {};
    }
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

      // Shift others to make room at the new influencer's position
      const targetOrder = inf.order;
      const currentInfluencers = mergeInfluencers(overrides);
      const others = currentInfluencers.sort((a, b) => a.order - b.order);

      let pos = 1;
      for (const existing of others) {
        if (pos === targetOrder) pos++; // skip the target slot
        const existingOverride = next[existing.slug] || ALL_INFLUENCERS.find((i) => i.slug === existing.slug);
        next[existing.slug] = { ...(existingOverride || existing), order: pos } as Influencer;
        pos++;
      }

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

      // Reorder logic: if order changed, shift others to make room
      if (partial.order !== undefined) {
        const targetOrder = partial.order;
        const currentInfluencers = mergeInfluencers(overrides);
        const oldOrder = currentInfluencers.find((i) => i.slug === finalSlug)?.order;

        // Build clean ordered list excluding the moved influencer
        const others = currentInfluencers
          .filter((inf) => inf.slug !== finalSlug)
          .sort((a, b) => a.order - b.order);

        // Reassign sequential orders, inserting gap at targetOrder
        let pos = 1;
        for (const inf of others) {
          if (pos === targetOrder) pos++; // skip the target slot
          const infExisting = next[inf.slug] || ALL_INFLUENCERS.find((i) => i.slug === inf.slug);
          if (inf.order !== pos || oldOrder !== undefined) {
            next[inf.slug] = { ...(infExisting || inf), order: pos } as Influencer;
          }
          pos++;
        }
        // If target is beyond all others, no gap was made — it's fine, updated influencer just goes at end
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
