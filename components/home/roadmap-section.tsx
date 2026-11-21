import { Badge } from '@/components/ui/badge';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type RoadmapSectionProps = {
  locale: Locale;
};

export function RoadmapSection({ locale }: RoadmapSectionProps) {
  const t = getMessages(locale).HomePage.hub.roadmap;

  return (
    <section
      className="flex animate-shell-enter-up flex-col gap-4"
      style={{ animationDelay: '240ms' }}
    >
      <h2 className="text-sm font-semibold text-foreground">{t.title}</h2>
      <ul
        aria-label={t.title}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
      >
        {t.items.map((item) => (
          <li
            key={item.name}
            className="flex flex-1 items-center justify-between gap-2 rounded-2xl border border-border bg-card p-4 sm:flex-col sm:items-start sm:gap-3"
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground">{item.name}</span>
              {item.kind === 'tooling' && item.description ? (
                <span className="text-sm leading-5 text-muted-foreground">{item.description}</span>
              ) : null}
            </div>
            <Badge variant={item.status === 'shipped' ? 'default' : 'secondary'}>
              {item.status === 'shipped' ? t.shipped : t.future}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
