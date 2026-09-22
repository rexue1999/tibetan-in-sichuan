import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  headers: async () => [
    {
      source: '/images/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      /*
        Unlisted client itineraries (see public/itineraries/).

        X-Robots-Tag duplicates the `noindex` meta tag inside each document.
        The header is the version that survives someone editing the HTML — worth
        having, because these pages are generated files that get regenerated.

        Note there is deliberately NO matching Disallow in robots.ts. Blocking
        the path in robots.txt would stop crawlers from ever reading this
        noindex, and a URL that gets linked from somewhere public can still
        appear in results as a bare URL with no snippet. "Blocked" and "not
        indexed" are different states; noindex is the one that de-indexes.
      */
      source: '/itineraries/:path*',
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
        },
        /*
          Not `immutable`. These documents get revised and resent, and a client
          holding a cached copy of an outdated price is worse than a 304.
          max-age=0 forces a revalidation on every visit: unchanged content
          comes back as a cheap 304, changed content appears immediately.
        */
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
      ],
    },
  ],
};

export default withIntl(nextConfig);
