'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { cn } from '@/lib/utils';

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  return (
    <BlurFade
      inView
      blur="3px"
      offset={8}
      duration={0.22}
      delay={delay}
      className={cn('motion-reveal', className)}
    >
      {children}
    </BlurFade>
  );
}
