/**
 * Guide article registry.
 *
 * Articles are authored per-locale inside `messages/*.json` under the
 * `guides.<slug>` namespace so that every locale stays in one file and the
 * existing translation tooling keeps working. This module only holds the
 * locale-independent metadata (slug, cover image, publish/update dates and
 * per-locale keyword lists used for metadata).
 *
 * To add a guide: append an entry here, then add a matching `guides.<slug>`
 * block with `title`, `excerpt`, `metaTitle`, `metaDesc` and `sections[]` to
 * every locale file.
 */

export type GuideSlug =
  | 'altitude-sickness'
  | 'best-time-to-visit'
  | 'tibetan-culture-etiquette'
  | 'what-to-pack'
  | 'chengdu-to-tibet-transport'
  | 'first-time-tibet-travel';

export type GuideMeta = {
  slug: GuideSlug;
  /** Route cover image, already cache-busted. */
  image: string;
  /** ISO date shown to readers and used for `datePublished`. */
  published: string;
  /** ISO date used for `dateModified`. Bump when copy changes. */
  updated: string;
  /** Rough reading time in minutes, computed from copy length. */
  minutes: number;
  keywords: string[];
};

export const guides: GuideMeta[] = [
  {
    slug: 'altitude-sickness',
    image: '/images/gongga.jpg?v=2',
    published: '2026-09-21',
    updated: '2026-09-21',
    minutes: 7,
    keywords: [
      'altitude sickness Sichuan',
      'AMS prevention tibet',
      'Kangding altitude 2560m',
      'high altitude travel tips',
      'altitude sickness symptoms',
    ],
  },
  {
    slug: 'best-time-to-visit',
    image: '/images/tagong.jpg?v=2',
    published: '2026-09-21',
    updated: '2026-09-21',
    minutes: 6,
    keywords: [
      'best time to visit Western Sichuan',
      'Sichuan highland seasons',
      'Tagong grassland best season',
      'Zoige grassland summer',
      'Sichuan travel weather',
    ],
  },
  {
    slug: 'tibetan-culture-etiquette',
    image: '/images/serda.jpg?v=2',
    published: '2026-09-21',
    updated: '2026-09-21',
    minutes: 6,
    keywords: [
      'Tibetan culture etiquette',
      'monastery visiting rules',
      'Tibetan travel respect',
      'kata scarf etiquette',
      'Tibetan Buddhist customs',
    ],
  },
  {
    slug: 'what-to-pack',
    image: '/images/litang.jpg?v=2',
    published: '2026-09-21',
    updated: '2026-09-21',
    minutes: 5,
    keywords: [
      'what to pack Sichuan trip',
      'Tibet packing list',
      'highland travel gear',
      'Sichuan travel checklist',
      'travelling Tibetan plateau',
    ],
  },
  {
    slug: 'chengdu-to-tibet-transport',
    image: '/images/highland-trip.jpg?v=2',
    published: '2026-09-21',
    updated: '2026-09-21',
    minutes: 7,
    keywords: [
      'Chengdu to Tibet transport',
      'Chengdu to Kangding bus',
      'Sichuan to Tibet overland',
      'G318 Sichuan Tibet highway',
      'getting to Western Sichuan',
    ],
  },
  {
    slug: 'first-time-tibet-travel',
    image: '/images/yading.jpg?v=2',
    published: '2026-09-21',
    updated: '2026-09-21',
    minutes: 8,
    keywords: [
      'first time Tibet travel',
      'Tibet travel permit',
      'Western Sichuan vs Tibet',
      'planning first Tibet trip',
      'Tibetan plateau beginner guide',
    ],
  },
];

export const guideSlugs = guides.map((g) => g.slug);

export function getGuide(slug: string): GuideMeta | undefined {
  return guides.find((g) => g.slug === slug);
}
