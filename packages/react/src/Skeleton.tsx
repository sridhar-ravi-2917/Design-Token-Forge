import { forwardRef, type HTMLAttributes } from 'react';
import type { DensitySize } from './types.js';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  /** Width (e.g. "100%", "200px") */
  width?: string;
  /** Height (e.g. "1em", "40px") */
  height?: string;
  /** Number of text lines to show */
  lines?: number;
  /** Disable shimmer animation */
  static?: boolean;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ variant = 'rect', width, height, lines, static: isStatic, className, style, ...rest }, ref) => {
    if (variant === 'text' && lines && lines > 1) {
      return (
        <span
          ref={ref}
          className={`skeleton skeleton--text-block${className ? ` ${className}` : ''}`}
          data-variant="text"
          data-static={isStatic || undefined}
          role="status"
          aria-label="Loading"
          style={style}
          {...rest}
        >
          {Array.from({ length: lines }).map((_, i) => (
            <span key={i} className="skeleton" data-variant="text" aria-hidden="true" />
          ))}
        </span>
      );
    }
    return (
      <span
        ref={ref}
        className={`skeleton${className ? ` ${className}` : ''}`}
        data-variant={variant}
        data-static={isStatic || undefined}
        role="status"
        aria-label="Loading"
        style={{ width, height, ...style }}
        {...rest}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';
