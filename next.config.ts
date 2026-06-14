import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

export default withNextIntl(nextConfig);
