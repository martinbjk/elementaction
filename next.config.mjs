import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * GitHub Pages: statisk export till /out. Med egen domän (elementaction.com)
 * ska NEXT_PUBLIC_BASE_PATH vara tom — det sätts i .github/workflows/pages-deploy.yml.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: { unoptimized: true }
};

export default withNextIntl(nextConfig);
