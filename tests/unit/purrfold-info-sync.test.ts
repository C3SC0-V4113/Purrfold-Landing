import { describe, expect, it } from 'vitest';

import {
  buildCliCommand,
  defaultFlags,
  defaultSsrFor,
  frameworks,
  supportsSsr,
  viteRouters,
  withFramework,
} from '@/lib/build-command';
import info from '@/lib/generated/purrfold-info.json';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

// Every `--flag` token in a flags string, e.g. "--ssr / --no-ssr" -> ["--ssr", "--no-ssr"].
function flagTokens(flags: string): string[] {
  return flags.split(/[\s<]/).filter((token) => token.startsWith('--'));
}

const cliFlags = new Set(info.options.flatMap((option) => flagTokens(option.flags)));

describe('landing content tracks `purrfold info --json`', () => {
  it.each([
    ['en', en],
    ['es', es],
  ])('documents exactly the CLI flags (%s)', (_locale, messages) => {
    const documented = new Set(
      messages.Pages.install.flagsReference.items.flatMap((item) => flagTokens(item.flag))
    );

    expect([...documented].sort()).toEqual([...cliFlags].sort());
  });

  it('offers every framework the CLI scaffolds', () => {
    expect([...frameworks].sort()).toEqual(info.frameworks.map((framework) => framework.id).sort());
  });

  it('matches each framework rendering and router defaults', () => {
    for (const framework of info.frameworks) {
      const id = framework.id as (typeof frameworks)[number];

      expect(supportsSsr(id)).toBe(framework.rendering?.ssr ?? false);
      expect(defaultSsrFor(id)).toBe(framework.rendering?.defaultSsr ?? false);
    }
  });

  it('matches the Vite router modes and default', () => {
    const vite = info.frameworks.find((framework) => framework.id === 'vite');

    expect([...viteRouters].sort()).toEqual([...(vite?.routers ?? [])].sort());
    expect(defaultFlags.router).toBe(vite?.defaultRouter);
  });

  it('only emits flags the CLI knows', () => {
    for (const framework of frameworks) {
      const flags = { ...withFramework(defaultFlags, framework), query: true, motion: true };
      const tokens = buildCliCommand(flags, 'npx purrfold@latest my-app')
        .split(' ')
        // --preset is forwarded to shadcn through --shadcn-args, not parsed by purrfold.
        .filter((token) => token.startsWith('--') && token !== '--preset');

      for (const token of tokens) expect(cliFlags).toContain(token);
    }
  });
});
