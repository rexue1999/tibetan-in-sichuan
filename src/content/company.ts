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
  /** Real name, or a first name if they prefer privacy. */
  name: string;
  /** Role shown under the name, e.g. 'Founder & Lead Guide'. */
  role: string;
  /** One or two sentences. Keep it human and specific. */
  bio: string;
  /**
   * Path to a portrait in /public/images/, or null to render initials.
   * Example: '/images/team-sonam.jpg?v=2'
   */
  photo: string | null;
  /** Languages spoken, in lowercase BCP-47-ish codes for display. */
  languages: string[];
};

export const teamMembers: TeamMember[] = [
  {
    // TODO: replace with the founder's real name.
    id: 'founder',
    name: 'Our founder',
    role: 'Founder & Lead Guide',
    bio: 'Placeholder — replace with a short, personal introduction: where you grew up, how you came to run journeys here, and what you care about when guiding.',
    photo: null,
    languages: ['en', 'zh'],
  },
  {
    // TODO: replace with a real guide, or delete this entry.
    id: 'guide-local',
    name: 'Our local guide',
    role: 'Local Guide · Tibetan Highlands',
    bio: 'Placeholder — replace with a real guide profile. Guests respond strongly to knowing who will actually walk beside them.',
    photo: null,
    languages: ['zh'],
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
