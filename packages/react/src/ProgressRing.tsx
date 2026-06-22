import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize, SemanticRole } from './types.js';

export type ProgressRingVariant = 'filled' | 'outlined' | 'soft';

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  size?: DensitySize;
  variant?: ProgressRingVariant;
  colorRole?: SemanticRole;
  /** Value 0–100 */
  value?: number;
  indeterminate?: boolean;
  disabled?: boolean;
  /** Center label element or text */
  label?: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(
  ({ size, variant, colorRole, value, indeterminate, disabled, label, className, ...rest }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      className={`progress-ring${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-role={colorRole}
      data-indeterminate={indeterminate || undefined}
      data-disabled={disabled || undefined}
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ '--progress': `${value ?? 0}%` } as React.CSSProperties}
      {...rest}
    >
      {/* SVG is rendered by the CSS layer; this wrapper holds the label */}
      {label && <span className="progress-ring__label" aria-hidden="true">{label}</span>}
    </div>
  )
);
ProgressRing.displayName = 'ProgressRing';
