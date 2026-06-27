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

function getCssVariables(cssBlock: string) {
  return Object.fromEntries(
    Array.from(cssBlock.matchAll(/--([\w-]+):\s*([^;]+);/g)).map(([, name, value]) => [
      name,
      value.trim(),
    ])
  );
}

function resolveCssVariable(variables: Record<string, string>, name: string): string {
  const value = variables[name];
  expect(value).toBeDefined();

  const reference = value.match(/^var\(--([\w-]+)\)$/);
  return reference ? resolveCssVariable(variables, reference[1]) : value;
}

function oklchToLinearSrgb(value: string) {
  const match = value.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+%?)?\s*\)$/);
  expect(match).not.toBeNull();

  const lightness = Number(match?.[1]);
  const chroma = Number(match?.[2]);
  const hue = (Number(match?.[3]) * Math.PI) / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);

  const l = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const m = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const s = lightness - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l ** 3;
  const m3 = m ** 3;
  const s3 = s ** 3;

  return [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
}

function contrastRatio(first: string, second: string) {
  const luminance = (value: string) => {
    const [red, green, blue] = oklchToLinearSrgb(value);
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  };
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);

  return (lighter + 0.05) / (darker + 0.05);
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
    expect(globalsCss).toContain('--animate-hero-enter: none;');
    expect(globalsCss).toContain('--animate-tab-enter: none;');
    expect(globalsCss).toContain('--animate-shimmer-slide: none;');
    expect(globalsCss).toContain('--animate-spin-around: none;');
    expect(globalsCss).toContain('--animate-shine: none;');
    expect(globalsCss).toContain('.animate-button-press,');
    expect(globalsCss).toContain('.animate-card-lift,');
    expect(globalsCss).toContain('.animate-shimmer-slide,');
    expect(globalsCss).toContain('.motion-reveal,');
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
          selectors.some(
            (selector) => !selector.startsWith('.animate-') && !selector.startsWith('.motion-')
          )
      )
    ).toEqual([]);
  });

  it('records the accepted controlled motion policy', () => {
    const adr0004 = readProjectFile('docs/adr/0004-css-only-animation-policy.md');
    const design = readProjectFile('DESIGN.md');

    expect(adr0004).toContain('# ADR 0004: CSS-first controlled motion policy');
    expect(adr0004).toContain('Allow `motion` and Magic UI only in small client islands');
    expect(adr0004).toContain('always-visible copy affordance');
    expect(adr0004).toContain('prefers-reduced-motion');
    expect(adr0004).toContain('scale(0.97)');
    expect(adr0004).toContain('(hover: hover) and (pointer: fine)');
    expect(design).toContain('Use CSS-first motion');
    expect(design).toContain(
      'Terminal-style command surfaces must preserve an always-visible copy'
    );
    expect(design).toContain('Keyboard focus must remain visible');
  });

  it('keeps the visual rework scoped to subtle Magic UI surfaces', () => {
    const packageJson = readProjectFile('package.json');
    const homePage = readProjectFile('app/[locale]/page.tsx');
    const codeBlock = readProjectFile('components/common/code-block.tsx');
    const commandTerminal = readProjectFile('components/motion/command-terminal.tsx');
    const dottedBackground = readProjectFile('components/common/dotted-background.tsx');
    const generatedOutput = readProjectFile('components/install/generated-output.tsx');
    const premiumCard = readProjectFile('components/motion/premium-card.tsx');
    const qualityToolCard = readProjectFile('components/quality/quality-tool-card.tsx');
    const pageShell = readProjectFile('components/common/page-shell.tsx');
    const shimmerCtaLink = readProjectFile('components/motion/shimmer-cta-link.tsx');

    expect(packageJson).toContain('"motion"');
    expect(homePage).toContain(
      "import { DottedBackground } from '@/components/common/dotted-background';"
    );
    expect(homePage).toContain("import { ShineBorder } from '@/components/ui/shine-border';");
    expect(homePage).toContain('var(--color-shine-border-from)');
    expect(dottedBackground).toContain("import { DotPattern } from '@/components/ui/dot-pattern';");
    expect(dottedBackground).toContain('bg-gradient-to-b');
    expect(dottedBackground).toContain('[mask-image:radial-gradient');
    expect(codeBlock).toContain(
      "import { CommandTerminal } from '@/components/motion/command-terminal';"
    );
    expect(commandTerminal).toContain('<CopyButton text={text} />');
    expect(commandTerminal).toContain('sequence={false}');
    expect(commandTerminal).toContain('top-2');
    expect(generatedOutput).toContain('var(--color-shine-border-from)');
    expect(generatedOutput).not.toContain('oklch(');
    expect(qualityToolCard).not.toContain('oklch(');
    expect(qualityToolCard).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    expect(pageShell).not.toContain("from '@/components/ui/card'");
    expect(pageShell).toContain(
      "import { DottedBackground } from '@/components/common/dotted-background';"
    );
    expect(pageShell).toContain(
      "import { SectionReveal } from '@/components/motion/section-reveal';"
    );
    expect(premiumCard).toContain('gradientOpacity={0.08}');
    expect(premiumCard).toContain('var(--color-premium-card-gradient)');
    expect(premiumCard).not.toContain('oklch(');
    expect(premiumCard).toContain('rounded-[min(var(--radius-4xl),24px)]');
    expect(premiumCard).toContain('[--card-spacing:--spacing(5)]');
    expect(shimmerCtaLink).toContain(
      "import { ShimmerButton } from '@/components/ui/shimmer-button';"
    );
    expect(shimmerCtaLink).toContain('var(--color-shimmer-cta)');
    expect(shimmerCtaLink).not.toContain('oklch(');
    expect(shimmerCtaLink).toContain('shimmerDuration="7s"');
  });

  it('keeps the dotted background static and token-driven for render performance', () => {
    const nextConfig = readProjectFile('next.config.ts');
    const dotPattern = readProjectFile('components/ui/dot-pattern.tsx');
    const globalsCss = readProjectFile('app/globals.css');

    expect(nextConfig).not.toContain('reactCompiler');
    expect(dotPattern).not.toContain("'use client'");
    expect(dotPattern).not.toContain('motion/react');
    expect(dotPattern).not.toContain('motion.circle');
    expect(dotPattern).not.toContain('useEffect');
    expect(dotPattern).not.toContain('useState');
    expect(dotPattern).not.toContain('getBoundingClientRect');
    expect(dotPattern).toContain('<pattern');
    expect(dotPattern).toContain('<rect width="100%" height="100%"');
    expect(dotPattern).toContain('text-dotted-background');
    expect(globalsCss).toContain('--color-dotted-background: var(--dotted-background);');
    expect(globalsCss).toContain('--color-premium-card-gradient: var(--premium-card-gradient);');
    expect(globalsCss).toContain(
      '--color-premium-card-gradient-from: var(--premium-card-gradient-from);'
    );
    expect(globalsCss).toContain(
      '--color-premium-card-gradient-to: var(--premium-card-gradient-to);'
    );
    expect(globalsCss).toContain('--color-shine-border-from: var(--shine-border-from);');
    expect(globalsCss).toContain('--color-shine-border-to: var(--shine-border-to);');
    expect(globalsCss).toContain('--color-shimmer-cta: var(--shimmer-cta);');
    expect(globalsCss).toContain('--dotted-background:');
    expect(globalsCss).toContain('--premium-card-gradient:');
    expect(globalsCss).toContain('--premium-card-gradient-from:');
    expect(globalsCss).toContain('--premium-card-gradient-to:');
    expect(globalsCss).toContain('--shine-border-from:');
    expect(globalsCss).toContain('--shine-border-to:');
    expect(globalsCss).toContain('--shimmer-cta:');
    expect(globalsCss).not.toContain('--dotted-background-color:');
    expect(globalsCss).not.toContain('--premium-card-gradient-color:');
    expect(globalsCss).not.toContain('--shimmer-cta-color:');
  });

  it('keeps PremiumCard as the only card surface for MagicCard-backed cards', () => {
    const magicCard = readProjectFile('components/ui/magic-card.tsx');
    const cardSurfaceFiles = [
      'components/home/summary-cards.tsx',
      'components/install/preset-example.tsx',
      'components/skills/skill-card.tsx',
      'components/quality/quality-tool-card.tsx',
      'components/ecosystem/ecosystem-resource-card.tsx',
    ];

    expect(magicCard).toContain('linear-gradient(var(--color-card) 0 0) padding-box');
    expect(magicCard).toContain('bg-card');

    for (const relativePath of cardSurfaceFiles) {
      const file = readProjectFile(relativePath);

      expect(file).not.toMatch(/import\s+\{\s*Card[\s,}]/);
      expect(file).not.toMatch(/<PremiumCard[^>]*>[\s\S]*<Card[\s>]/);
    }
  });

  it('defines the cat-inspired semantic palette with AA text contrast', () => {
    const globalsCss = readProjectFile('app/globals.css');
    const lightTheme = getCssVariables(extractCssBlock(globalsCss, '\n:root {'));
    const darkTheme = getCssVariables(extractCssBlock(globalsCss, '\n.dark {'));
    const expectedTokens = [
      'background',
      'foreground',
      'card',
      'card-foreground',
      'popover',
      'popover-foreground',
      'primary',
      'primary-foreground',
      'secondary',
      'secondary-foreground',
      'muted',
      'muted-foreground',
      'accent',
      'accent-foreground',
      'destructive',
      'border',
      'input',
      'ring',
      'chart-1',
      'chart-2',
      'chart-3',
      'chart-4',
      'chart-5',
      'sidebar',
      'sidebar-foreground',
      'sidebar-primary',
      'sidebar-primary-foreground',
      'sidebar-accent',
      'sidebar-accent-foreground',
      'sidebar-border',
      'sidebar-ring',
      'dotted-background',
      'premium-card-gradient',
      'premium-card-gradient-from',
      'premium-card-gradient-to',
      'shine-border-from',
      'shine-border-to',
      'shimmer-cta',
    ];
    const contrastPairs = [
      ['background', 'foreground'],
      ['card', 'card-foreground'],
      ['popover', 'popover-foreground'],
      ['primary', 'primary-foreground'],
      ['secondary', 'secondary-foreground'],
      ['muted', 'muted-foreground'],
      ['accent', 'accent-foreground'],
    ] as const;

    expect(Object.keys(lightTheme)).toEqual(expect.arrayContaining(expectedTokens));
    expect(Object.keys(darkTheme)).toEqual(expect.arrayContaining(expectedTokens));
    expect(lightTheme.primary).toBe('oklch(0.518 0.081 236.9)');
    expect(darkTheme.primary).toBe('oklch(0.748 0.078 229.6)');
    expect([
      lightTheme['chart-1'],
      lightTheme['chart-2'],
      lightTheme['chart-3'],
      lightTheme['chart-4'],
      lightTheme['chart-5'],
    ]).toEqual([
      'oklch(0.603 0.08 234.3)',
      'oklch(0.702 0.077 39.8)',
      'oklch(0.617 0.086 104.7)',
      'oklch(0.58 0.032 48.1)',
      'oklch(0.394 0.008 53.3)',
    ]);
    expect(lightTheme['sidebar-primary']).toBe('var(--primary)');
    expect(darkTheme['sidebar-primary']).toBe('var(--primary)');

    for (const theme of [lightTheme, darkTheme]) {
      for (const [surface, text] of contrastPairs) {
        expect(
          contrastRatio(resolveCssVariable(theme, surface), resolveCssVariable(theme, text))
        ).toBeGreaterThanOrEqual(4.5);
      }
    }

    const design = readProjectFile('DESIGN.md');
    expect(design).toContain('Siamese eye blue');
    expect(design).toContain('Faded calico cream and peach');
    expect(design).toContain('Black tabby charcoal and taupe');
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
