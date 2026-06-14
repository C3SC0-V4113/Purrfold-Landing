import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { getLocale } from 'next-intl/server';

import { siteUrl } from '@/lib/site';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  description: 'Localized landing for installation, skills, quality, and ecosystem navigation.',
  metadataBase: siteUrl,
  title: {
    default: 'Purrfold',
    template: '%s | Purrfold',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale().catch(() => 'en');

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {process.env.NODE_ENV === 'development' && (
          <Script src="https://unpkg.com/react-scan/dist/auto.global.js" crossOrigin="anonymous" />
        )}
        {children}
      </body>
    </html>
  );
}
