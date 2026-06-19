import { qualitySections, qualityTools } from '@/components/quality/quality-catalog';
import { QualityToolCard } from '@/components/quality/quality-tool-card';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type QualityViewProps = { locale: Locale };

export function QualityView({ locale }: QualityViewProps) {
  const t = getMessages(locale).Pages.quality;

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">{t.overview.title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{t.overview.description}</p>
        <p className="text-sm leading-6 text-muted-foreground">{t.overview.defaultNote}</p>
      </section>

      {qualitySections.map((section) => {
        const tools = qualityTools.filter((tool) => tool.section === section.id);
        const sectionCopy = t.sections[section.titleKey];

        return (
          <section key={section.id} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-semibold text-foreground">{sectionCopy.title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{sectionCopy.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tools.map((tool) => {
                const msg = t.tools[tool.id];

                return (
                  <QualityToolCard
                    key={tool.id}
                    name={msg.name}
                    purpose={msg.purpose}
                    whenHelp={msg.whenHelp}
                    status={tool.status}
                    flag={tool.flag}
                    href={tool.href}
                    linkLabel={t.linkLabel}
                    statusLabels={{ default: t.badges.default, optional: t.badges.optional }}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
