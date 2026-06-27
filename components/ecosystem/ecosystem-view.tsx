import { ecosystemCategories, ecosystemResources } from '@/components/ecosystem/ecosystem-catalog';
import { EcosystemResourceCard } from '@/components/ecosystem/ecosystem-resource-card';
import { SectionReveal } from '@/components/motion/section-reveal';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type EcosystemViewProps = { locale: Locale };

export function EcosystemView({ locale }: EcosystemViewProps) {
  const t = getMessages(locale).Pages.ecosystem;

  return (
    <div className="flex flex-col gap-8">
      <SectionReveal>
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-foreground">{t.overview.title}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{t.overview.description}</p>
        </section>
      </SectionReveal>

      {ecosystemCategories.map((category, index) => {
        const categoryCopy = t.categories[category.id];
        const resources = ecosystemResources.filter(
          (resource) => resource.category === category.id
        );

        return (
          <SectionReveal key={category.id} delay={0.03 + index * 0.03}>
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-semibold text-foreground">{categoryCopy.title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {categoryCopy.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {resources.map((resource) => {
                  const resourceCopy = t.resources[resource.id];

                  return (
                    <EcosystemResourceCard
                      key={resource.id}
                      name={resourceCopy.name}
                      summary={resourceCopy.summary}
                      usage={resourceCopy.usage}
                      category={resource.category}
                      categoryLabel={categoryCopy.badge}
                      href={resource.href}
                      linkLabel={t.linkLabel}
                      linkAriaLabel={`${t.linkLabel}: ${resourceCopy.name}`}
                    />
                  );
                })}
              </div>
            </section>
          </SectionReveal>
        );
      })}
    </div>
  );
}
