/**
 * Customer reviews.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  HOW TO ADD A REVIEW
 * ─────────────────────────────────────────────────────────────────────────
 *  1. Copy the `template` block at the bottom of this file.
 *  2. Paste it into the `reviews` array ABOVE the template.
 *  3. Fill in the real review text, name, country and date.
 *  4. Set `verified: true` only if you can point to the original message
 *     (WhatsApp / email / WeChat) — never mark unverified copy as verified.
 *
 *  Reviews are shown on /reviews and the most recent three also appear on
 *  the homepage. Only reviews with `published: true` render anywhere.
 *
 *  IMPORTANT: `rating` values feed an AggregateRating in structured data.
 *  Google penalises sites that self-publish fake review markup, so only
 *  leave ratings on reviews that are genuinely from customers. If a review
 *  has no star rating, omit the `rating` field entirely.
 * ─────────────────────────────────────────────────────────────────────────
 */

import type { GuideSlug } from './guides';

export type Review = {
  /** Stable id — also used as the React key. Keep it URL-safe. */
  id: string;
  /** Display name. Use a first name + initial if the guest prefers privacy. */
  name: string;
  /** Country of origin, shown next to the name. */
  country: string;
  /** Which route this review refers to, or null for general feedback. */
  route:
    | 'tibetan-walk-chengdu'
    | 'go-west-go-tibet'
    | 'tibetan-nomad'
    | null;
  /** Month-level date is enough, e.g. 'October 2025'. */
  date: string;
  /** ISO date for structured data, e.g. '2025-10-01'. */
  dateISO: string;
  /** 1–5. Omit the whole field if the guest did not give a star rating. */
  rating?: number;
  /**
   * Review body. The `text` field is locale-keyed: put the English original
   * here and, if you want, a translation under other locale codes. Any
   * missing locale automatically falls back to `en`.
   */
  text: Partial<Record<'en' | 'es' | 'th' | 'zh', string>> & { en: string };
  /** true once you have the original message on file. */
  verified: boolean;
  /** Flip to true to make it visible. */
  published: boolean;
};

export const reviews: Review[] = [
  // ── Add real reviews here. Insert new ones at the TOP so the newest
  //    shows first on the homepage. ─────────────────────────────────────
];

/**
 * Copy this block, fill it in, and paste it into the `reviews` array above.
 *
 * {
 *   id: 'jane-d-2026-05',
 *   name: 'Jane D.',
 *   country: 'Australia',
 *   route: 'tibetan-nomad',
 *   date: 'May 2026',
 *   dateISO: '2026-05-01',
 *   rating: 5,
 *   text: {
 *     en: 'Paste the real review text here.',
 *     zh: '中文翻译（可留空，留空则显示英文原文）。',
 *   },
 *   verified: true,
 *   published: true,
 * },
 */
export const reviewTemplate = {} as Review;

/** Reviews visible right now, newest first. */
export const publishedReviews = reviews.filter((r) => r.published);

/** True when there is at least one review with a numeric rating. */
export const hasRatings = publishedReviews.some((r) => typeof r.rating === 'number');

/** Average of all numeric ratings, or null when none exist. */
export function averageRating(): number | null {
  const rated = publishedReviews.filter((r) => typeof r.rating === 'number');
  if (!rated.length) return null;
  const sum = rated.reduce((acc, r) => acc + (r.rating ?? 0), 0);
  return Math.round((sum / rated.length) * 10) / 10;
}

/** Resolve a review body for a locale, falling back to English. */
export function reviewText(review: Review, locale: string): string {
  return (
    review.text[locale as 'en' | 'es' | 'th' | 'zh'] ?? review.text.en
  );
}

/** Route slugs referenced by guides, re-exported for convenience. */
export type { GuideSlug };
