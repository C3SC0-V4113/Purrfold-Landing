import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FlagItem = {
  flag: string;
  description: string;
};

export type FlagsReferenceMessages = {
  title: string;
  items: readonly FlagItem[];
};

type FlagsReferenceProps = {
  messages: FlagsReferenceMessages;
};

export function FlagsReference({ messages }: FlagsReferenceProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{messages.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {messages.items.map((item, index) => (
                <tr key={`${item.flag}-${index}`} className="border-b last:border-b-0">
                  <td className="py-2 pr-4 align-top font-mono">{item.flag}</td>
                  <td className="py-2 pl-4 align-top text-muted-foreground">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
