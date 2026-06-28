'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';

import { PurrfoldCatIcon } from '@/components/common/brand-icons';
import { cn } from '@/lib/utils';

const burstCats = [
  {
    className: '-left-7 top-0 hidden sm:inline-flex',
    delay: 0.34,
    rotate: -18,
    x: -16,
    y: -16,
  },
  {
    className: '-top-7 left-1/4 inline-flex',
    delay: 0.4,
    rotate: 12,
    x: -6,
    y: -20,
  },
  {
    className: '-right-7 top-1 hidden sm:inline-flex',
    delay: 0.46,
    rotate: 18,
    x: 16,
    y: -14,
  },
  {
    className: '-bottom-3 right-1/4 inline-flex',
    delay: 0.52,
    rotate: -10,
    x: 10,
    y: 18,
  },
] as const;

export function HeroCatBurst() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        {burstCats.map((cat, index) => (
          <m.span
            key={`${cat.className}-${cat.delay}`}
            initial={
              shouldReduceMotion ? false : { opacity: 0, rotate: 0, scale: 0.82, x: 0, y: 0 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 0.5 }
                : { opacity: 0.55, rotate: cat.rotate, scale: 1, x: cat.x, y: cat.y }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { delay: cat.delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }
            }
            className={cn(
              'absolute size-4 items-center justify-center rounded-full bg-card/80 text-primary shadow-sm ring-1 ring-border/70 backdrop-blur',
              cat.className
            )}
          >
            <PurrfoldCatIcon className={index % 2 === 0 ? 'size-3.5' : 'size-3'} />
          </m.span>
        ))}
      </span>
    </LazyMotion>
  );
}
