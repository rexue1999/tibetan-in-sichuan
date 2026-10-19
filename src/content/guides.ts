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
  | 'yading-guide'
  | 'g318-highway-guide'
  | 'serta-larung-gar-guide'
  | 'altitude-sickness'
  | 'best-time-to-visit'
  | 'tibetan-culture-etiquette'
  | 'what-to-pack'
  | 'chengdu-to-tibet-transport'
  | 'first-time-tibet-travel'
  | 'tibet-permit-explained';

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
    slug: 'yading-guide',
    image: '/images/yading-autumn.jpg',
    published: '2026-10-19',
    updated: '2026-10-19',
    minutes: 8,
    keywords: [
      'Yading travel guide',
      'Daocheng Yading trekking',
      'Yading milk lake hike',
      'Yading altitude',
      'Yading tickets reservation',
    ],
  },
  {
    slug: 'g318-highway-guide',
    image: '/images/g318-hairpins.jpg',
    published: '2026-10-19',
    updated: '2026-10-19',
    minutes: 7,
    keywords: [
      'G318 Sichuan Tibet highway',
      'Chengdu to Lhasa overland',
      'Zheduo Pass altitude',
      'Litang world high city',
      'drive G318 western Sichuan',
    ],
  },
  {
    slug: 'serta-larung-gar-guide',
    image: '/images/serta-mandala.jpg',
    published: '2026-10-19',
    updated: '2026-10-19',
    minutes: 6,
    keywords: [
      'Seda Larung Gar visit',
      'Larung Gar reservation',
      'Seda Buddhist academy',
      'can foreigners visit Seda',
      'Seda travel guide',
    ],
  },
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
  {
    slug: 'tibet-permit-explained',
    image: '/images/muya.jpg?v=2',
    published: '2026-09-21',
    updated: '2026-09-21',
    minutes: 7,
    keywords: [
      'Tibet travel permit',
      'do I need a Tibet permit for Sichuan',
      'Western Sichuan no permit needed',
      'Tibet Entry Permit vs China visa',
      'Kangding Tagong permit',
    ],
  },
];

export const guideSlugs = guides.map((g) => g.slug);

export function getGuide(slug: string): GuideMeta | undefined {
  return guides.find((g) => g.slug === slug);
}
