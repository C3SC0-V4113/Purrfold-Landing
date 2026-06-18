import { CopyButton } from '@/components/common/copy-button';
import { ScrollArea } from '@/components/ui/scroll-area';

type CodeBlockProps = {
  /** Text content to display and copy */
  text: string;
  /** Max height of the scroll area (default: 200px) */
  maxHeight?: string;
  /** Additional classes on the wrapper div */
  className?: string;
};

/**
 * Standardized code block with ScrollArea, mono font, and copy button.
 * Replaces the repetitive ScrollArea + pre + code + CopyButton pattern.
 */
export function CodeBlock({ text, maxHeight = '200px', className }: CodeBlockProps) {
  return (
    <div className={className}>
      <div className="relative text-foreground">
        <ScrollArea className="rounded-2xl bg-muted" style={{ maxHeight }}>
          <pre className="max-h-50 overflow-x-auto p-4 pr-12 font-mono text-sm whitespace-pre-wrap">
            <code className="break-all">{text}</code>
          </pre>
        </ScrollArea>
        <div className="absolute top-2 right-3 z-10">
          <CopyButton text={text} />
        </div>
      </div>
    </div>
  );
}
