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
  /**
   * Optional screenshot(s) of the original message, shown beside the text so
   * the review reads as a real chat rather than site copy. Paths are relative
   * to /public. Keep these cropped to the guest's own words.
   */
  images?: { src: string; width: number; height: number; alt: string }[];
  /** true once you have the original message on file. */
  verified: boolean;
  /** Flip to true to make it visible. */
  published: boolean;
};

export const reviews: Review[] = [
  // Newest first.
  {
    id: 'martina-vilardo-2026-08',
    name: 'Martina Vilardo',
    country: 'Italy',
    route: 'go-west-go-tibet',
    date: 'August 2026',
    dateISO: '2026-08-19',
    text: {
      en: 'Also, a very super giant thank you to Aron and his car! We truly think that if now we can appreciate more the Chinese, Sichuan and Tibetan culture, it is thanks to you. Thank you for your patience, for your positive energy, your kindness always, and for all your advice! We will miss you. I still need to convince Davide, but someday I will move here and I will be a Sichuan troublemaker!',
      es: '¡Y un agradecimiento enorme, gigante, a Aron y a su coche! Creemos de verdad que si hoy podemos apreciar mejor la cultura china, la de Sichuan y la tibetana, es gracias a ti. ¡Gracias por tu paciencia, por tu energía positiva, por tu amabilidad de siempre y por todos tus consejos! Te vamos a extrañar. Todavía tengo que convencer a Davide, pero algún día me mudo aquí ¡y seré una alborotadora de Sichuan!',
      th: 'และขอขอบคุณ Aron กับรถของเขาอย่างสุดหัวใจ! เราคิดจริง ๆ ว่าถ้าวันนี้เราเข้าใจวัฒนธรรมจีน เสฉวน และทิเบตได้ดีขึ้น ก็ต้องขอบคุณคุณ ขอบคุณสำหรับความอดทน พลังบวก ความใจดีที่มีให้เสมอ และคำแนะนำทุกอย่าง! เราจะคิดถึงคุณ ยังต้องเกลี้ยกล่อม Davide อยู่ แต่สักวันหนึ่งฉันจะย้ายมาอยู่ที่นี่ และจะเป็นตัวป่วนแห่งเสฉวนให้ได้เลย!',
      zh: '还要特别特别感谢 Aron 和他的车！我们真心觉得，如今我们能更懂得中国、四川和西藏的文化，全靠你。谢谢你的耐心、你的正能量、你一贯的善意，还有你所有的建议！我们会想你的。我还得说服 Davide，但总有一天我会搬来这里，当一个"四川捣蛋鬼"！',
    },
    verified: true,
    published: true,
    images: [
      {
        src: '/images/reviews/martina-review.jpg',
        width: 760,
        height: 823,
        alt: 'WhatsApp message from Martina Vilardo thanking the driver and guide after the highland loop',
      },
    ],
  },
  {
    id: 'valerie-2026-08',
    name: 'Valerie',
    country: 'United States',
    route: 'go-west-go-tibet',
    date: 'August 2026',
    dateISO: '2026-08-17',
    text: {
      en: 'Thank you all for making our honeymoon so special! And thank you so much for taking us all around, it was such a pleasure!',
      es: '¡Gracias a todos por hacer nuestra luna de miel tan especial! ¡Y muchísimas gracias por llevarnos a todos lados, fue un verdadero placer!',
      th: 'ขอบคุณทุกคนที่ทำให้ฮันนีมูนของเราพิเศษขนาดนี้! และขอบคุณมาก ๆ ที่พาเราไปทั่วทุกที่ มันเป็นความสุขจริง ๆ!',
      zh: '谢谢你们让我们的蜜月如此特别！也非常感谢你带我们到处走，真的太愉快了！',
    },
    verified: true,
    published: true,
    images: [
      {
        src: '/images/reviews/valerie-review.jpg',
        width: 760,
        height: 645,
        alt: 'WhatsApp message from Valerie thanking the guide on her honeymoon trip',
      },
    ],
  },
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
 *   // Optional. Save a crop to /public/images/reviews/ showing only the
 *   // guest's own words — no phone numbers, avatars or your own replies
 *   // unless you have their permission and want them shown.
 *   images: [
 *     {
 *       src: '/images/reviews/jane-d-2026-05.jpg',
 *       width: 760,
 *       height: 600,
 *       alt: 'WhatsApp message from Jane D. after the nomad camp',
 *     },
 *   ],
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
