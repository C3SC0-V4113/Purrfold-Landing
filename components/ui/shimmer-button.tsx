import React, {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactElement,
} from 'react';

import { cn } from '@/lib/utils';

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {/* spark container */}
        <div
          className={cn('-z-30 blur-[2px]', '@container-[size] absolute inset-0 overflow-visible')}
        >
          {/* spark */}
          <div className="absolute inset-0 aspect-[1] h-[100cqh] animate-shimmer-slide rounded-none [mask:none]">
            {/* spark before */}
            <div className="absolute -inset-full w-auto [translate:0_0] rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>
        {asChild && isValidElement<{ children?: React.ReactNode }>(children)
          ? children.props.children
          : children}

        {/* Highlight */}
        <div
          className={cn(
            'absolute inset-0 size-full',

            'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',

            // transition
            'transform-gpu transition-all duration-300 ease-in-out',

            // on hover
            'group-hover:shadow-[inset_0_-6px_10px_#ffffff2a]',

            // on click
            'group-active:shadow-[inset_0_-10px_10px_#ffffff2a]'
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            'absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]'
          )}
        />
      </>
    );

    const shimmerStyle = {
      '--spread': '70deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
    } as CSSProperties;

    const shimmerClassName = cn(
      'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]',
      'transform-gpu transition-transform duration-150 ease-out active:scale-[0.98]',
      className
    );

    if (asChild) {
      const child = Children.only(children);

      if (!isValidElement<{ className?: string; style?: CSSProperties }>(child)) {
        throw new Error('ShimmerButton: asChild requires a valid React element.');
      }

      return cloneElement(
        child as ReactElement<{ className?: string; style?: CSSProperties }>,
        {
          className: cn(shimmerClassName, child.props.className),
          style: { ...shimmerStyle, ...child.props.style },
        },
        content
      );
    }

    return (
      <button style={shimmerStyle} className={shimmerClassName} ref={ref} {...props}>
        {content}
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
