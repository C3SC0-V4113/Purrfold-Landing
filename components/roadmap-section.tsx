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
      <ul className="flex flex-col gap-3">
        {t.items.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
          >
            <span className="font-medium text-foreground">{item.name}</span>
            <Badge variant={item.status === 'shipped' ? 'default' : 'secondary'}>
              {item.status === 'shipped' ? t.shipped : t.future}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
