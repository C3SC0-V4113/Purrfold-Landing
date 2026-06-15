import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const projectRoot = process.cwd();

function readProjectFile(relativePath: string) {
  return readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

function extractCssBlock(css: string, prelude: string) {
  const preludeIndex = css.indexOf(prelude);
  expect(preludeIndex).toBeGreaterThanOrEqual(0);

  const openingBraceIndex = css.indexOf('{', preludeIndex);
  expect(openingBraceIndex).toBeGreaterThanOrEqual(0);

  let depth = 0;

  for (let index = openingBraceIndex; index < css.length; index += 1) {
    if (css[index] === '{') {
      depth += 1;
    }

    if (css[index] === '}') {
      depth -= 1;

      if (depth === 0) {
        return css.slice(openingBraceIndex + 1, index);
      }
    }
  }

  throw new Error(`Could not find closing brace for ${prelude}`);
}

function getCssRules(cssBlock: string) {
  return Array.from(cssBlock.matchAll(/([^{}]+)\{([^{}]*)\}/g)).map(
    ([, selector, declarations]) => ({
      declarations,
      selectors: selector
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    })
  );
}

function targetsGlobalUniversalSelector(selector: string) {
  return /^\*(?:$|::?|[\s>+~#[.])/.test(selector);
}

describe('phase 2 design shell navigation artifacts', () => {
  it('defines minimal shared motion tokens and reduced-motion guards in globals.css', () => {
    const globalsCss = readProjectFile('app/globals.css');

    expect(globalsCss).toContain('--animate-shell-fade-in: shell-fade-in 180ms ease-out both;');
    expect(globalsCss).toContain('--animate-shell-enter-up: shell-enter-up 220ms ease-out both;');
    expect(globalsCss).toContain('@keyframes shell-fade-in');
    expect(globalsCss).toContain('@keyframes shell-enter-up');
    expect(globalsCss).toContain('@media (prefers-reduced-motion: reduce)');
    expect(globalsCss).toContain('--animate-shell-fade-in: none;');
    expect(globalsCss).toContain('--animate-shell-enter-up: none;');
    expect(globalsCss).toContain('.animate-shell-fade-in,');
    expect(globalsCss).toContain('.animate-shell-enter-up {');

    const reducedMotionBlock = extractCssBlock(
      globalsCss,
      '@media (prefers-reduced-motion: reduce)'
    );
    const reducedMotionRules = getCssRules(reducedMotionBlock);
    const motionProperties =
      /(^|;)\s*(animation|animation-duration|transition|transition-duration)\s*:/;

    expect(
      reducedMotionRules.filter(({ selectors }) =>
        selectors.some((selector) => targetsGlobalUniversalSelector(selector))
      )
    ).toEqual([]);
    expect(
      reducedMotionRules.filter(
        ({ declarations, selectors }) =>
          motionProperties.test(declarations) &&
          selectors.some((selector) => !selector.startsWith('.animate-shell-'))
      )
    ).toEqual([]);
  });

  it('records the accepted design-system boundary ADR and aligns ADR 0001 status', () => {
    const adr0002 = readProjectFile('docs/adr/0002-design-system-boundaries.md');
    const adr0001 = readProjectFile('docs/adr/0001-i18n-and-routing.md');

    expect(adr0002).toContain('# ADR 0002: Design system boundaries for shell navigation');
    expect(adr0002).toContain('## Status');
    expect(adr0002).toContain('Accepted');
    expect(adr0002).toContain('Base UI `render`');
    expect(adr0002).toContain('lucide-react');
    expect(adr0002).toContain('opencode.json');
    expect(adr0002).toContain('shadcn MCP');
    expect(adr0001).toContain('## Status');
    expect(adr0001).toContain('Accepted');
  });

  it('documents repo-level shadcn MCP enablement in AGENTS and README', () => {
    const agents = readProjectFile('AGENTS.md');
    const readme = readProjectFile('README.md');

    expect(agents).toContain('repo-level `opencode.json`');
    expect(agents).toContain('shadcn MCP is enabled');
    expect(readme).toContain('repo-level `opencode.json`');
    expect(readme).toContain('shadcn MCP is enabled');
  });
});
