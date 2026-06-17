import { CopyButton } from '@/components/copy-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type QuickInstallProps = {
  locale: Locale;
};

export function QuickInstall({ locale }: QuickInstallProps) {
  const t = getMessages(locale).HomePage.hub.tabs;

  return (
    <section
      className="flex animate-shell-enter-up flex-col gap-4"
      style={{ animationDelay: '80ms' }}
    >
      <h2 className="text-sm font-semibold text-foreground">{t.title}</h2>
      <Tabs defaultValue="cli">
        <TabsList>
          <TabsTrigger value="cli">{t.cli}</TabsTrigger>
          <TabsTrigger value="agent">{t.agent}</TabsTrigger>
        </TabsList>
        <TabsContent value="cli">
          <div className="relative">
            <pre className="overflow-x-auto rounded-2xl bg-muted p-4 font-mono text-sm">
              <code>{t.cliCommand}</code>
            </pre>
            <div className="absolute top-2 right-2">
              <CopyButton text={t.cliCommand} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="agent">
          <div className="relative">
            <pre className="overflow-x-auto rounded-2xl bg-muted p-4 font-mono text-sm whitespace-pre-wrap">
              <code>{t.agentPrompt}</code>
            </pre>
            <div className="absolute top-2 right-2">
              <CopyButton text={t.agentPrompt} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
