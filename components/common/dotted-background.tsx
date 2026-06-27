import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

type DottedBackgroundProps = {
  className?: string;
};

export function DottedBackground({ className }: DottedBackgroundProps) {
  return (
    <>
      <DotPattern
        width={22}
        height={22}
        cr={0.6}
        className={cn(
          'absolute inset-x-0 top-0 -z-10 h-[28rem] [mask-image:radial-gradient(ellipse_at_top,white_8%,transparent_76%)]',
          className
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-52 -z-10 h-48 bg-gradient-to-b from-transparent via-background/75 to-background"
      />
    </>
  );
}
