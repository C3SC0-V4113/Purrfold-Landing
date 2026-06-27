import { CommandTerminal } from '@/components/motion/command-terminal';

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
  return <CommandTerminal text={text} maxHeight={maxHeight} className={className} />;
}
