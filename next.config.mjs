import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntl(nextConfig);
