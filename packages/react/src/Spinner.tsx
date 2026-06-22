import { forwardRef, type HTMLAttributes } from 'react';
import type { DensitySize, SemanticRole } from './types.js';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: DensitySize;
  colorRole?: SemanticRole;
  /** Screen-reader label (default: "Loading") */
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size, colorRole, label = 'Loading', className, ...rest }, ref) => (
    <span
      ref={ref}
      role="status"
      className={`spinner${className ? ` ${className}` : ''}`}
      data-size={size}
      data-role={colorRole}
      aria-label={label}
      {...rest}
    >
      <span className="spinner__ring" aria-hidden="true" />
    </span>
  )
);
Spinner.displayName = 'Spinner';
