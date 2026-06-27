import { cn } from '@/lib/utils';

/**
 * Static SVG dot pattern for decorative backgrounds.
 *
 * Keep this component render-only: no layout measurement, no generated circle arrays,
 * and no Motion primitives. A repeated SVG pattern is enough for a background and
 * avoids thousands of React nodes during scroll/resize interactions.
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
}

function getPatternId({ width, height, x, y, cx, cy, cr }: Required<DotPatternSeed>) {
  return `dot-pattern-${width}-${height}-${x}-${y}-${cx}-${cy}-${cr}`.replace(/\./g, '_');
}

type DotPatternSeed = Pick<DotPatternProps, 'width' | 'height' | 'x' | 'y' | 'cx' | 'cy' | 'cr'>;

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const patternId = getPatternId({ width, height, x, y, cx, cy, cr });

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none h-full w-full text-dotted-background', className)}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          x={x}
          y={y}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
