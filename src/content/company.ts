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
