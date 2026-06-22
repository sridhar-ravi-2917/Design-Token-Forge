import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  size?: DensitySize;
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  /** Optional label in the center */
  label?: ReactNode;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ size, variant, orientation = 'horizontal', label, className, ...rest }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={`divider${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-orientation={orientation}
      {...rest}
    >
      {label && <span className="divider__label">{label}</span>}
    </div>
  )
);
Divider.displayName = 'Divider';
