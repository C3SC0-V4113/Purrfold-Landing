import { BriefcaseBusinessIcon, GitBranchIcon, GlobeIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { getMessages } from '@/i18n/messages';
import { externalLinks } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

type SiteFooterProps = {
  locale: Locale;
};

const externalLinkAttributes = {
  rel: 'noreferrer noopener',
  target: '_blank',
} as const;

const footerLinks = [
  { key: 'github', href: externalLinks.github, icon: GitBranchIcon },
  { key: 'website', href: externalLinks.personalWebsite, icon: GlobeIcon },
  { key: 'linkedin', href: externalLinks.linkedin, icon: BriefcaseBusinessIcon },
] as const;

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = getMessages(locale).Footer;

  return (
    <footer className="border-t border-border bg-background text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold tracking-tight text-foreground">Purrfold</p>
            <p className="max-w-md leading-6">{t.description}</p>
          </div>
          <nav aria-label={t.label} className="flex flex-wrap items-center gap-2">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              const label = t.links[link.key];

              return (
                <a
                  key={link.href}
                  href={link.href}
                  {...externalLinkAttributes}
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-2xl text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none sm:h-8 sm:w-auto sm:gap-1.5 sm:px-3"
                >
                  <Icon
                    aria-hidden="true"
                    data-icon="inline-start"
                    data-testid={`footer-${link.key}-icon`}
                  />
                  <span className="hidden sm:inline">{label}</span>
                </a>
              );
            })}
          </nav>
        </div>
        <Separator />
        <p className="text-xs leading-5">{t.credit}</p>
      </div>
    </footer>
  );
}
