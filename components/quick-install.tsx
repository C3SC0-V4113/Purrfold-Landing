import { CopyButton } from '@/components/copy-button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
            <div className="relative">
              <ScrollArea className="max-h-[200px] rounded-2xl bg-muted">
                <pre className="p-4 pr-12 font-mono text-sm">
                  <code className="break-all">{t.cliCommand}</code>
                </pre>
              </ScrollArea>
              <div className="absolute top-2 right-3 z-10">
                <CopyButton text={t.cliCommand} />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="agent" className="max-w-full">
          <div className="animate-tab-enter">
            <div className="relative">
              <pre className="overflow-x-auto rounded-2xl bg-muted p-4 pr-10 font-mono text-sm whitespace-pre-wrap">
                <code>{t.agentPrompt}</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={t.agentPrompt} />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
