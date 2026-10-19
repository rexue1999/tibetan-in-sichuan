/**
 * Route registry — the single source of truth for locale-independent route
 * data.
 *
 * Everything a route is, except its copy, lives here: the slug, which
 * `routes.<key>` namespace in `messages/*.json` holds its translated content,
 * the cover image, the tier-badge colour, the sitemap priority and the SEO
 * keyword list. Before this file existed the same four facts were written out
 * in four places — the homepage slug list, the detail page's route map, the
 * card component's image array and the sitemap — and they were only kept in
 * sync by remembering to edit all of them.
 *
 * Adding a route: append an entry here, add a matching `routes.routeN` block
 * to every locale file, and add an Offer entry to the TravelAgency JSON-LD in
 * `src/app/[locale]/layout.tsx` (that block carries commercial facts — prices
 * and descriptions — which belong beside the copy, not here).
 *
 * The copy itself stays in `messages/*.json` under `routes.<key>`, translated
 * per locale like everything else on the site.
 */

export type RouteKey = 'route1' | 'route2' | 'route3';

export type RouteMeta = {
  /** URL segment, used in /routes/[slug]. */
  slug: string;
  /** Which `routes.<key>` block in messages holds this route's copy. */
  key: RouteKey;
  /** Cover image (cards + detail hero), already cache-busted. */
  image: string;
  /** Tier badge colour on the route card. */
  tierColor: string;
  /** Sitemap priority. */
  priority: number;
  /** SEO keywords for the detail page. */
  keywords: string[];
};

export const routes: RouteMeta[] = [
  {
    slug: 'tibetan-walk-chengdu',
    key: 'route1',
    image: '/images/walk-tour.jpg?v=2',
    tierColor: 'bg-[#5B7B5A]',
    priority: 0.8,
    keywords: [
      'Chengdu Tibetan walking tour',
      'Tibetan culture Chengdu',
      'Wuhouci Tibetan quarter',
      'Chengdu cultural tour',
    ],
  },
  {
    slug: 'go-west-go-tibet',
    key: 'route2',
    image: '/images/highland-trip.jpg?v=2',
    tierColor: 'bg-[#B8934E]',
    priority: 0.9,
    keywords: [
      'Chengdu to Tibet tour',
      'Kangding Tagong tour',
      'Western Sichuan highland tour',
      'Xinduqiao photographer paradise',
      'Zheduo Pass 4298m',
    ],
  },
  {
    slug: 'tibetan-nomad',
    key: 'route3',
    image: '/images/nomad.jpg?v=2',
    tierColor: 'bg-[#8C3B2E]',
    priority: 0.9,
    keywords: [
      'Tibetan nomad homestay',
      'Zoige grasslands tour',
      'Hongyuan nomad experience',
      'Sichuan nomad family stay',
    ],
  },
];

/** Route metadata by slug, or undefined for unknown slugs. */
export function getRoute(slug: string): RouteMeta | undefined {
  return routes.find((r) => r.slug === slug);
}
