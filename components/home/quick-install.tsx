import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type QuickInstallProps = {
  locale: Locale;
};

export function QuickInstall({ locale }: QuickInstallProps) {
  const t = getMessages(locale).HomePage.hub.tabs;

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="sr-only">{t.title}</h2>
      <Tabs defaultValue="cli">
        <TabsList>
          <TabsTrigger value="cli">{t.cli}</TabsTrigger>
          <TabsTrigger value="agent">{t.agent}</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="max-w-full">
          <div className="animate-tab-enter">
            <CodeBlock text={t.cliCommand} />
          </div>
        </TabsContent>
        <TabsContent value="agent" className="max-w-full">
          <div className="animate-tab-enter">
            <CodeBlock text={t.agentPrompt} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
