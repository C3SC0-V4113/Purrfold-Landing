'use client';

import { MagicCard } from '@/components/ui/magic-card';
import { cn } from '@/lib/utils';

type PremiumCardProps = React.AriaAttributes & {
  children: React.ReactNode;
  className?: string;
  id?: string;
  role?: React.AriaRole;
  size?: 'default' | 'sm';
  tabIndex?: number;
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export function PremiumCard({ children, className, size = 'default', ...props }: PremiumCardProps) {
  return (
    <MagicCard
      data-slot="premium-card"
      data-size={size}
      gradientSize={180}
      gradientOpacity={0.08}
      gradientColor="oklch(0.748 0.078 229.6 / 0.2)"
      gradientFrom="oklch(0.748 0.078 229.6 / 0.35)"
      gradientTo="oklch(0.702 0.077 39.8 / 0.25)"
      className={cn(
        'group/card flex h-full flex-col gap-(--card-spacing) overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-card py-(--card-spacing) text-sm text-card-foreground shadow-sm ring-1 ring-foreground/5 [--card-spacing:--spacing(5)] data-[size=sm]:[--card-spacing:--spacing(4)] dark:ring-foreground/10',
        className
      )}
      {...props}
    >
      {children}
    </MagicCard>
  );
}
