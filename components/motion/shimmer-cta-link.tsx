import Link from 'next/link';

import { ShimmerButton } from '@/components/ui/shimmer-button';
import { cn } from '@/lib/utils';

import type { CSSProperties, ReactNode } from 'react';

type ShimmerCtaLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ShimmerCtaLink({ href, children, className, style }: ShimmerCtaLinkProps) {
  return (
    <ShimmerButton
      asChild
      shimmerColor="oklch(0.985 0.012 75.4 / 0.45)"
      shimmerDuration="7s"
      shimmerSize="2px"
      background="var(--primary)"
      borderRadius="var(--radius-2xl)"
      className={cn('h-11 px-8 text-sm font-medium text-primary-foreground shadow-sm', className)}
    >
      <Link href={href} style={style as CSSProperties}>
        <span className="relative">{children}</span>
      </Link>
    </ShimmerButton>
  );
}
