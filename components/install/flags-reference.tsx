import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

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
        <Table>
          <TableBody>
            {messages.items.map((item, index) => (
              <TableRow key={`${item.flag}-${index}`}>
                <TableCell className="align-top font-mono text-nowrap">{item.flag}</TableCell>
                <TableCell className="align-top text-muted-foreground">
                  {item.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
