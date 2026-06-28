import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import AppleIcon from '@/app/apple-icon';
import Icon from '@/app/icon';
import manifest from '@/app/manifest';
import OpenGraphImage from '@/app/opengraph-image';
import robots from '@/app/robots';
import { buildPageMetadata } from '@/lib/metadata';
import { buildAbsoluteSiteUrl, brandColors, siteName } from '@/lib/site';

const projectRoot = process.cwd();

function readProjectFile(relativePath: string) {
  return readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

describe('SEO metadata foundation', () => {
  it('builds localized page metadata with search and social fields', async () => {
    const metadata = await buildPageMetadata('en', '/install');

    expect(metadata.title).toBe('Install Purrfold');
    expect(metadata.description).toContain('Install Purrfold from the CLI');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['Purrfold', 'Purrfold CLI', 'shadcn UI'])
    );
    expect(metadata.alternates).toEqual({
      canonical: '/en/install',
      languages: {
        en: '/en/install',
        es: '/es/install',
      },
    });
    expect(metadata.openGraph).toMatchObject({
      description: metadata.description,
      locale: 'en_US',
      siteName,
      title: 'Install Purrfold | Purrfold',
      type: 'website',
      url: '/en/install',
    });
    expect(metadata.openGraph?.images).toEqual([
      {
        alt: 'Purrfold cat brand card for agent-first project scaffolding',
        height: 630,
        url: '/opengraph-image',
        width: 1200,
      },
    ]);
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      description: metadata.description,
      images: ['/opengraph-image'],
      title: 'Install Purrfold | Purrfold',
    });
    expect(metadata.robots).toMatchObject({
      follow: true,
      index: true,
    });
  });

  it('builds Spanish metadata from localized copy', async () => {
    const metadata = await buildPageMetadata('es', '/');

    expect(metadata.title).toBe('Scaffolding de proyectos para agentes');
    expect(metadata.description).toContain('Purrfold ayuda a generar proyectos');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['Purrfold', 'scaffolding para agentes', 'desarrollo con agentes'])
    );
    expect(metadata.openGraph).toMatchObject({
      alternateLocale: ['en_US'],
      locale: 'es_ES',
      title: 'Scaffolding de proyectos para agentes | Purrfold',
      url: '/es',
    });
  });

  it('generates robots and manifest from the shared site contract', () => {
    expect(robots()).toEqual({
      host: 'http://localhost:3000',
      rules: {
        allow: '/',
        userAgent: '*',
      },
      sitemap: buildAbsoluteSiteUrl('/sitemap.xml'),
    });

    expect(manifest()).toMatchObject({
      background_color: brandColors.background,
      display: 'standalone',
      name: siteName,
      short_name: siteName,
      start_url: '/en',
      theme_color: brandColors.primary,
    });
    expect(manifest().icons).toEqual([
      {
        sizes: '32x32',
        src: '/icon',
        type: 'image/png',
      },
      {
        sizes: '180x180',
        src: '/apple-icon',
        type: 'image/png',
      },
    ]);
  });

  it('keeps generated image routes static, branded, and free of localhost hardcoding', () => {
    const generatedImageFiles = ['app/icon.tsx', 'app/apple-icon.tsx', 'app/opengraph-image.tsx'];

    for (const relativePath of generatedImageFiles) {
      const file = readProjectFile(relativePath);

      expect(file).toContain("import { ImageResponse } from 'next/og';");
      expect(file).toContain('brandColors');
      expect(file).toContain('SeoCatMark');
      expect(file).not.toContain('localhost');
    }

    expect(readProjectFile('components/seo/seo-cat-mark.tsx')).toContain('SeoCatMark');

    const icon = readProjectFile('app/icon.tsx');
    const appleIcon = readProjectFile('app/apple-icon.tsx');
    const opengraphImage = readProjectFile('app/opengraph-image.tsx');

    expect(icon).toContain('height: 32');
    expect(icon).toContain('width: 32');
    expect(appleIcon).toContain('height: 180');
    expect(appleIcon).toContain('width: 180');
    expect(opengraphImage).toContain('height: 630');
    expect(opengraphImage).toContain('width: 1200');
    expect(opengraphImage).toContain('Purrfold cat brand card');
  });

  it('creates generated image route responses with png headers', () => {
    for (const response of [Icon(), AppleIcon(), OpenGraphImage()]) {
      expect(response.headers.get('content-type')).toContain('image/png');
    }
  });
});
