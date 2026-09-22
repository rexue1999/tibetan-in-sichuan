/**
 * Social profile links.
 *
 * Reads the configured profiles from `content/company.ts` and renders one
 * icon per platform that has a real URL. Platforms left as `null` are
 * skipped entirely — we never render an icon that links to nowhere.
 *
 * If nothing is configured the component renders null, so it is safe to
 * drop into a page before the accounts exist.
 *
 * `tone` picks the colour treatment for the two backgrounds it appears on:
 *   'dark'  — for the near-black footer; icons sit in a soft white.
 *   'light' — for white cards on the booking page.
 */

import { activeSocialLinks, SOCIAL_LABEL } from '../content/company';
import { SocialIcon } from './SocialIcon';

export function SocialLinks({
  tone = 'light',
  size = 18,
  className = '',
  /** Accessible label for the group, e.g. 'Follow us'. */
  label,
}: {
  tone?: 'light' | 'dark';
  size?: number;
  className?: string;
  label?: string;
}) {
  const links = activeSocialLinks();
  if (links.length === 0) return null;

  const itemClass =
    tone === 'dark'
      ? 'text-white/55 hover:text-white ring-1 ring-white/15 hover:ring-white/35'
      : 'text-stone-500 hover:text-[#8C3B2E] ring-1 ring-stone-200 hover:ring-[#8C3B2E]/40';

  return (
    <ul className={`flex items-center gap-3 ${className}`} aria-label={label}>
      {links.map(({ platform, url }) => (
        <li key={platform}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer me"
            // The visible glyph is decorative, so name the link for screen
            // readers and for the hover tooltip.
            aria-label={SOCIAL_LABEL[platform]}
            title={SOCIAL_LABEL[platform]}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${itemClass}`}
          >
            <SocialIcon name={platform} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
