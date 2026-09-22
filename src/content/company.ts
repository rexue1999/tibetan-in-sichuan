/**
 * Team & company facts.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  FILL-IN GUIDE
 * ─────────────────────────────────────────────────────────────────────────
 *  Everything marked `TODO` is a placeholder. Replace the value and delete
 *  the surrounding `TODO` comment. The site renders fine with placeholders
 *  in place — they read as neutral copy — but real names and stories will
 *  convert far better and help with search trust (E-E-A-T).
 *
 *  To add a team member: copy an entry in `teamMembers` and fill it in.
 *  Set `photo` to a file in /public/images/ (portrait, ideally 800×1000)
 *  or leave it null to render an initials monogram instead.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type TeamMember = {
  id: string;
  /**
   * Name as shown to visitors. Proper nouns are not translated, so this is
   * shared across locales. Include the Chinese name for readers who know it.
   */
  name: string;
  /**
   * Optional i18n key suffix. When set, `role` and `bio` are read from
   * `messages/*.json` under `about.team.<i18nKey>.role` / `.bio` so the
   * profile is written in the reader's language. When omitted, the literal
   * `role` / `bio` below are used instead.
   */
  i18nKey?: string;
  /** Role shown under the name. Used when `i18nKey` is not set. */
  role: string;
  /** One or two sentences. Used when `i18nKey` is not set. */
  bio: string;
  /**
   * Path to a portrait in /public/images/, or null to render initials.
   *
   * IMPORTANT: everything under /images/ is served `immutable` for a year (see
   * the headers in next.config.mjs), so a browser that has seen a file will not
   * re-check it. When you replace an existing photo, bump the `?v=` suffix —
   * otherwise you keep seeing the old picture while everyone else sees the new
   * one. Example: '/images/guide-yinn.jpg?v=2'
   */
  photo: string | null;
  /** Languages spoken, keyed to `about.langNames` for display. */
  languages: string[];
};

export const teamMembers: TeamMember[] = [
  {
    id: 'aaron',
    name: 'Aaron',
    // Role and bio live in messages/*.json under about.team.aaron.
    i18nKey: 'aaron',
    role: 'Founder & Lead Guide',
    bio: 'Has lived and worked in both Europe and the United States, and stayed in western Sichuan because of the Tibetan highlands. Professional, and genuinely in love with the place. A career without a single bad review — every trip built around the guests.',
    photo: '/images/founder-aaron.jpg?v=2',
    languages: ['en', 'zh'],
  },
  {
    id: 'yinn',
    name: 'Yinn（小颖）',
    // Role and bio live in messages/*.json under about.team.yinn.
    i18nKey: 'yinn',
    role: 'Local Guide · Tibetan Highlands',
    bio: 'Born in Wuhan and educated in Spain. Rides whenever she can and keeps returning to the Tibetan highlands. Leads monastery visits and the nomad camp.',
    photo: '/images/guide-yinn.jpg?v=1',
    languages: ['zh', 'en', 'fr'],
  },
];

export type CompanyFact = {
  /** Stable key used to look up the label in messages. */
  key: 'founded' | 'groupSize' | 'routes' | 'languages' | 'base';
  /** The value itself. Kept here so it is edited in one place. */
  value: string;
};

/**
 * Headline numbers shown on the About page. Keep these truthful — inflated
 * statistics are the fastest way to lose a reader's trust.
 *
 * TODO: replace the values below with your real figures.
 */
export const companyFacts: CompanyFact[] = [
  { key: 'founded', value: '2023' },
  { key: 'groupSize', value: '2–8' },
  { key: 'routes', value: '3' },
  { key: 'languages', value: '4' },
  { key: 'base', value: 'Chengdu, Sichuan' },
];

/**
 * Values / promises shown as a grid. These are deliberately concrete and
 * verifiable rather than generic marketing claims.
 *
 * TODO: adjust so every statement is something you actually stand behind.
 */
export const companyValues = [
  { key: 'v1' },
  { key: 'v2' },
  { key: 'v3' },
  { key: 'v4' },
] as const;

/** Contact details, reused by the About and booking pages. */
export const CONTACT = {
  whatsapp: 'https://wa.me/8619045478878',
  email: 'info@chengdujourneys.com',
  phone: '+86-19045478878',
} as const;

/**
 * Social profiles, rendered in the site footer and on the booking page, and
 * declared to Google in the Organization `sameAs` list.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  To change or remove a profile
 * ─────────────────────────────────────────────────────────────────────────
 *  Set a url to null for any platform you no longer want shown — the icon is
 *  then left out entirely, which is better than a link that goes nowhere.
 *
 *  A full URL is preferred, because it is unambiguous. A bare handle also
 *  works if that is quicker — the loader below turns it into the right
 *  profile URL for the platform (with or without a leading '@'):
 *    'https://www.instagram.com/yourhandle/'   or  '@yourhandle'
 *    'https://www.facebook.com/yourpage'       or  'yourpage'
 *    'https://www.tiktok.com/@yourhandle'      or  '@yourhandle'
 */
export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok';

export const SOCIAL: { platform: SocialPlatform; url: string | null }[] = [
  { platform: 'instagram', url: 'https://www.instagram.com/chengdujourneys/' },
  { platform: 'facebook', url: 'https://www.facebook.com/chengdujourneys' },
  { platform: 'tiktok', url: 'https://www.tiktok.com/@chengdujourneys' },
];

/**
 * Normalise a social entry into a link we can actually render, or null when
 * the platform has not been filled in yet. Accepts a full URL or a bare
 * handle (with or without a leading '@') so a half-filled config still works.
 */
export function resolveSocialUrl(platform: SocialPlatform, raw: string | null): string | null {
  if (raw === null) return null;
  const value = raw.trim();
  if (value === '') return null;

  // Already a full address — use as given, but force https.
  if (/^https?:\/\//i.test(value)) return value.replace(/^http:\/\//i, 'https://');

  // Bare handle — strip the sigils and build the canonical profile URL.
  const handle = value.replace(/^@/, '').replace(/^\/+|\/+$/g, '');
  if (handle === '') return null;

  switch (platform) {
    case 'instagram':
      return `https://www.instagram.com/${handle}/`;
    case 'facebook':
      return `https://www.facebook.com/${handle}`;
    case 'tiktok':
      return `https://www.tiktok.com/@${handle}`;
  }
}

/** The social links that are actually configured, ready to render. */
export function activeSocialLinks(): { platform: SocialPlatform; url: string }[] {
  return SOCIAL.flatMap(({ platform, url }) => {
    const resolved = resolveSocialUrl(platform, url);
    return resolved ? [{ platform, url: resolved }] : [];
  });
}

/** Display names, used for the icon's accessible label. */
export const SOCIAL_LABEL: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
};
